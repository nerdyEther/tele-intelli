const handleIncomingMessage = (req, res) => {
    const message = req.body.message;
    // Process the message, analyze keywords, sentiment, etc.
    res.status(200).json({ success: true, message: 'Message processed' });
  };
  
  module.exports = { handleIncomingMessage };
  