const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const Fact = require("./models/Fact");
const TelegramUser = require("./models/TelegramUser");
const Progress = require("./models/Progress");
const User = require("./models/User");

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

  // Award XP for requesting fact
  const telegramUser = await TelegramUser.findOne({ telegramId: String(chatId) });
  if (telegramUser) {
    // Find user by telegramId
    const user = await User.findOne({ telegramId: String(chatId) });
    if (user) {
      let progress = await Progress.findOne({ userId: user._id });
      if (!progress) {
        progress = new Progress({ userId: user._id });
      }

      progress.xp += 5; // 5 XP for requesting a fact

      // Update streak
      const today = new Date();
      if (!progress.lastViewed || (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) >= 1) {
        const diff = progress.lastViewed ? (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) : 0;
        if (diff <= 2) {
          progress.streaks += 1;
        } else {
          progress.streaks = 1;
        }
        progress.lastViewed = today;
      }

      await progress.save();

      // Sync with User model
      await User.findByIdAndUpdate(user._id, {
        $inc: { xpTotal: 5 },
        lastAccessedAt: new Date()
      });
    }
  }

  await sendFactToUser(chatId, fact);
});

// /progress command
bot.onText(/\/progress/, async (msg) => {
  const chatId = msg.chat.id;

  const telegramUser = await TelegramUser.findOne({ telegramId: String(chatId) });
  if (!telegramUser) {
    return bot.sendMessage(chatId, "Please use /start first to connect your account.");
  }

  const user = await User.findOne({ telegramId: String(chatId) });
  if (!user) {
    return bot.sendMessage(chatId, "Your Telegram account is not linked to a Nyayadeep account. Please log in to the web app and connect your Telegram ID in your profile.");
  }

  const progress = await Progress.findOne({ userId: user._id });
  if (!progress) {
    return bot.sendMessage(chatId, "No progress data found. Start learning to see your progress!");
  }

  const text = `📊 *Your Progress*\n\n` +
    `⭐ XP: ${progress.xp}\n` +
    `🔥 Current Streak: ${progress.streaks} days\n` +
    `📚 Completed Lessons: ${progress.completedLessons.filter(l => l.isCompleted).length}\n` +
    `🏆 Badges: ${progress.badges.length > 0 ? progress.badges.join(', ') : 'None yet'}\n\n` +
    `Keep learning to earn more XP and badges!`;

  await bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
});

module.exports = { bot, sendDailyFact };
