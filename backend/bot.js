// const TelegramBot = require('node-telegram-bot-api');
// const fetch = require('node-fetch');

// const token = process.env.TELEGRAM_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   if (text.toLowerCase() === '/dailyfact') {
//     const res = await fetch('http://localhost:5000/api/facts/send'); // call your API
//     const data = await res.json();
//     bot.sendMessage(chatId, data.fact || "No fact available");
//   } else {
//     // call Gemini API
//     const res = await fetch('https://api.gemini.com/v1/ai/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
//       },
//       body: JSON.stringify({ prompt: text }),
//     });
//     const data = await res.json();
//     bot.sendMessage(chatId, data.answer || "Gemini didn't return a valid response.");
//   }
// });

// console.log('Telegram bot running...');
