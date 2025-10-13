const cron = require("node-cron");
const { sendDailyFact } = require("../telegramBot");

const cronSchedule = process.env.CRON_SCHEDULE || "0 9 * * *";

cron.schedule(cronSchedule, async () => {
  console.log("Cron job triggered: sending daily facts...");
  try {
    await sendDailyFact({ delayMs: 200 });
  } catch (err) {
    console.error("Failed scheduled send:", err);
  }
});