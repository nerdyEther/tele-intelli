const express = require('express');
const { Telegraf } = require('telegraf');
const { addMessageToDatabase } = require('./bot_fun'); // Your database logic
const { getUserIdByGroupId } = require('./bot_fun'); // Function to get user ID from the groups table

const bot = new Telegraf(process.env.TELEGRAM_TOKEN); // Replace with your bot token

// Set up webhook endpoint
const webhookUrl = ' https://2e8a-103-186-41-227.ngrok-free.app'; // Use your ngrok URL here

bot.start((ctx) => ctx.reply('Welcome! I am your bot.'));

bot.on('text', async (ctx) => {
    const messageText = ctx.message.text; // The content of the message
    const groupId = ctx.chat.id; // Get the group ID
    const senderName = ctx.message.from.first_name; // Get sender's first name
    const senderTelegramId = ctx.message.from.id; // Get sender's Telegram ID

    try {
        // Fetch the user ID associated with the group from the database
        const userId = await getUserIdByGroupId(groupId);

        if (userId) {
            // Save the message to the database
            await addMessageToDatabase(groupId, userId, messageText, senderName, senderTelegramId);
        } else {
            console.error('User ID not found for group:', groupId);
        }
    } catch (error) {
        console.error('Error while processing message:', error);
    }
});


// Start listening to webhook events
bot.launch({
    webhook: {
        domain: webhookUrl,
        port: process.env.PORT || 7777,
    },
});

console.log('Bot is up and running...');