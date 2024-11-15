const express = require('express');
const router = express.Router();
const { handleIncomingMessage } = require('../controllers/telegramController');

router.post('/message', handleIncomingMessage);

module.exports = router;
