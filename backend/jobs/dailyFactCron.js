const cron = require("node-cron");
const axios = require("axios");

const allowedKey = process.env.BACKND_KEY;

if (!allowedKey) {
  console.error("missing BACKEND_KEY. Backend cannot start.");
  process.exit(1);
}

cron.schedule("49 11 * * *", async () => {
  try {
    console.log("Triggering /daily-fact/send API at 3:47 PM...");

    const { data } = await axios.post("http://localhost:5000/api/facts/send", {});
    console.log("Daily fact API response:", data);
  } catch (err) {
    console.error("Failed to call /daily-fact/send:", err.message);
  }
}, {
  timezone: "Asia/Kolkata"
});
