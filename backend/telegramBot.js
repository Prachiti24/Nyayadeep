const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const Fact = require("./models/Fact");
const TelegramUser = require("./models/TelegramUser");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
console.log("✅ Telegram bot started (polling)");

// Helper to delay between messages
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendFactToUser(chatId, fact) {
  const text = `📘 *Daily Fact*\n\n${fact.fact_text}\n\n_Source:_ ${fact.source || "Unknown"}`;
  try {
    await bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
    return true;
  } catch (err) {
    console.error(`Failed to send to ${chatId}:`, err);
    return false;
  }
}

async function getRandomFact() {
  const found = await Fact.aggregate([{ $match: { is_active: true } }, { $sample: { size: 1 } }]);
  return found.length ? found[0] : null;
}

async function sendDailyFact(options = {}) {
  const delayMs = options.delayMs || 200;
  const fact = await getRandomFact();
  if (!fact) return { sent: 0, reason: "no facts" };

  const users = await TelegramUser.find();
  console.log(`Sending fact to ${users.length} users...`);

  let sentCount = 0;
  for (const user of users) {
    const ok = await sendFactToUser(user.telegramId, fact);
    if (ok) sentCount++;
    await sleep(delayMs);
  }
  console.log(`✅ Sent to ${sentCount}/${users.length} users`);
  return { sent: sentCount, total: users.length };
}

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "there";

  let user = await TelegramUser.findOne({ telegramId: chatId });
  if (!user) {
    user = new TelegramUser({ name, telegramId: String(chatId) });
    await user.save();
    console.log("New Telegram user saved:", chatId);
  }

  await bot.sendMessage(chatId, `👋 Hi ${name}! You are now subscribed to daily facts about the Constitution. Send /fact for an on-demand fact.`);
});

// /fact command
bot.onText(/\/fact/, async (msg) => {
  const chatId = msg.chat.id;
  const fact = await getRandomFact();
  if (!fact) return bot.sendMessage(chatId, "No facts available right now.");
  await sendFactToUser(chatId, fact);
});

module.exports = { bot, sendDailyFact };
