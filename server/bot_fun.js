const pool = require('./db');

async function getUserIdByGroupId(groupId) {
    const query = 'SELECT user_id FROM Groups WHERE group_id = $1';
    const values = [groupId];

    try {
        const res = await pool.query(query, values);
        if (res.rows.length > 0) {
            return res.rows[0].user_id; // Return the user_id of the group
        } else {
            console.error('No user found for group ID:', groupId);
            return null; // No user found
        }
    } catch (error) {
        console.error('Error fetching user ID from database:', error);
        throw error;
    }
}


async function addMessageToDatabase(groupId, userId, messageText, senderName, senderTelegramId) {
    const query = `
        INSERT INTO Messages (group_id, user_id, message_text, sender_name, sender_telegram_id, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
    `;
    const values = [groupId, userId, messageText, senderName, senderTelegramId];

    try {
        const res = await pool.query(query, values);
        console.log('Message added successfully:', res);
    } catch (error) {
        console.error('Error adding message to database:', error);
        throw error; // Re-throw the error for handling elsewhere if needed
    }
}

 async function addGroupToDatabase (groupId, userId, groupName) {
    try {
      const res = await pool.query(
        'INSERT INTO Groups (group_id, user_id, group_name) VALUES ($1, $2, $3) RETURNING *',
        [groupId, userId, groupName]
      );
      return res.rows[0];
    } catch (error) {
      console.error('Error adding group to the database:', error);
      throw error;
    }
  };

module.exports = {
    addMessageToDatabase,  getUserIdByGroupId, addGroupToDatabase
    // Other database functions can be included here
};