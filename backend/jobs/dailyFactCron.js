const cron = require("node-cron");
const axios = require("axios");

cron.schedule("39 16 * * *", async () => {
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