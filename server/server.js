const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const cors = require('cors'); // Import cors
const axios = require('axios');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const { addGroupToDatabase } = require('./bot_fun');





// Import the database pool
const pool = require('./db');

const app = express();

app.use(cors());

app.use(bodyParser.json());


const telegramRoutes = require('./routes/telegram');

app.use('/api/telegram', telegramRoutes);



// Initialize Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', (msg) => {
    axios.post('http://localhost:5000/api/telegram/message', { message: msg })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
});

const bcrypt = require('bcrypt');

// Signup route to register new users
app.post('/signup', async (req, res) => {
  const { username, email, password, telegramId } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, telegram_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, telegramId]
    );

    // Return the newly created user
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send user information along with the token
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.username, // Assuming the name field exists in your users table
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/groups', async (req, res) => {
  const userId = req.query.userId; // Get the user ID from the query parameters

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const query = 'SELECT * FROM Groups WHERE user_id = $1'; // Use parameterized query to prevent SQL injection
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No groups found for this user' });
    }

    return res.json(rows); // Send the retrieved groups back to the frontend
  } catch (error) {
    console.error('Error fetching groups:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/gdetails', async (req, res) => {
  const groupId = req.query.id;  // Changed from req.params.id to req.query.id


  if (!groupId) {
    return res.status(400).json({ error: 'Group ID is required' });
  }

  try {
    // Query to fetch group details
    const groupQuery = `
      SELECT g.id, g.group_name, g.keywords, g.is_active, g.created_at,
             (SELECT json_agg(m) FROM Messages m WHERE m.group_id = g.id) AS messages
      FROM Groups g
      WHERE g.id = $1
    `;

    const { rows } = await pool.query(groupQuery, [groupId]);

    if (rows.length > 0) {
      res.json(rows[0]); // Send back the group details
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    console.error('Error fetching group details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/keywordchart', async (req, res) => {
  const { groupId } = req.query;
  const { userId } = req.query; // userId is passed as a query param
  
  try {
    // Fetch messages from the Messages table that match the groupId and userId
    const keywordQuery = `
      SELECT message_text
      FROM messages
      WHERE group_id = $1 AND user_id = $2;
    `;

    const result = await pool.query(keywordQuery, [groupId, userId]);

    const messages = result.rows.map(row => row.message_text);


    // Fetch the keywords for the specified group
    const keywordQueryForGroup = `
      SELECT keywords
      FROM groups
      WHERE group_id = $1;
    `;
    const keywordsResult = await pool.query(keywordQueryForGroup, [groupId]);

    const keywords = keywordsResult.rows[0]?.keywords || [];

    // Count occurrences of each keyword in messages
    const keywordCounts = {};
    keywords.forEach(keyword => {
      keywordCounts[keyword] = 0; // Initialize count
      messages.forEach(message => {
        // Use regex to find all occurrences of the keyword, case-insensitive
        const regex = new RegExp(keyword, 'gi'); // 'g' for global search, 'i' for case-insensitive
        const matches = message.match(regex);
        if (matches) {
          keywordCounts[keyword] += matches.length; // Increment count by the number of matches
        }
      });
    });

    // Transform the keywordCounts object into an array of { keyword, count }
    const keywordData = Object.entries(keywordCounts).map(([keyword, count]) => ({
      keyword,
      count
    }));

    res.json(keywordData); // Send the data to the frontend

  } catch (error) {
    console.error('Error fetching keyword data:', error);
    res.status(500).send('Server Error');
  }
});


app.post('/addKeyword', async (req, res) => {
  const { groupId, keyword } = req.body;
  try {
      await pool.query(`
          UPDATE Groups 
          SET keywords = array_append(keywords, $1)
          WHERE group_id = $2
      `, [keyword, groupId]);
      res.status(200).send({ message: 'Keyword added successfully' });
  } catch (error) {
      console.error('Error adding keyword:', error);
      res.status(500).send({ message: 'Error adding keyword' });
  }
});


app.post('/removeKeyword', async (req, res) => {
  const { groupId, keyword } = req.body;
  try {
      await pool.query(`
          UPDATE Groups 
          SET keywords = array_remove(keywords, $1)
          WHERE group_id = $2
      `, [keyword, groupId]);
      res.status(200).send({ message: 'Keyword removed successfully' });
  } catch (error) {
      console.error('Error removing keyword:', error);
      res.status(500).send({ message: 'Error removing keyword' });
  }
});

app.get('/userCounts', async (req, res) => {
  const { groupId, userId } = req.query;

  try {
    // Step 1: Fetch all messages for the specific group
    const messageQuery = `
      SELECT m.sender_name, m.message_text
      FROM Messages m
      WHERE m.group_id = $1;
    `;
    const { rows: messages } = await pool.query(messageQuery, [groupId]);

    

    // Step 2: Fetch keywords for the specified group
    const keywordQueryForGroup = `
      SELECT keywords
      FROM Groups
      WHERE group_id = $1;
    `;
    const keywordsResult = await pool.query(keywordQueryForGroup, [groupId]);
    const keywords = keywordsResult.rows[0]?.keywords || [];

    

    // Step 3: Initialize a counts object to store counts for each sender
    const counts = {};

    // Step 4: Iterate over messages and count keyword occurrences
    messages.forEach(message => {
      const { sender_name, message_text } = message;

      // Initialize sender in counts if not already present
      if (!counts[sender_name]) {
        counts[sender_name] = {};
        keywords.forEach(keyword => {
          counts[sender_name][keyword] = 0; // Initialize keyword count
        });
      }

      // Count occurrences of each keyword in the message
      keywords.forEach(keyword => {
        const regex = new RegExp(keyword, 'gi'); // Case insensitive regex
        const matches = message_text.match(regex);
        if (matches) {
          counts[sender_name][keyword] += matches.length; // Increment count
        }
      });
    });

    

    // Step 5: Prepare final data structure and sort it
    const finalCounts = Object.entries(counts).map(([sender_name, keywordCounts]) => {
      const total = Object.values(keywordCounts).reduce((a, b) => a + b, 0); // Total keyword count for the sender
      return { sender_name, keywordCounts, total };
    });

    

    // Sort by total count in descending order
    finalCounts.sort((a, b) => b.total - a.total);

    res.json(finalCounts); // Send the data to the frontend

  } catch (error) {
    console.error('Error fetching user counts:', error);
    res.status(500).json({ error: 'Error fetching user counts' });
  }
});



app.get('/totalMessages', async (req, res) => {
  const { groupId, userId } = req.query;

  if (!groupId || !userId) {
    return res.status(400).json({ error: 'Missing groupId or userId' });
  }

  try {
    // Assuming your messages table contains a group_id and user_id reference
    const totalMessages = await pool.query(
      'SELECT COUNT(*) FROM Messages WHERE group_id = $1 AND user_id = $2',
      [groupId, userId]
    );

    res.json({ totalMessages: totalMessages.rows[0].count });
  } catch (error) {
    console.error("Error fetching total messages:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/invite-bot', async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    // Add the group and user info to your database
    await addGroupToDatabase(groupId, userId);

    // Send the invite command to the Telegram bot
    const inviteLink = `https://t.me/YOUR_BOT_USERNAME?startgroup=${groupId}`;
    
    // Respond with success
    res.json({ success: true, inviteLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to invite bot to the group.' });
  }
});


const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
