const express = require('express');
const Fact = require('../models/Fact');
const router = express.Router();

// ✅ Get a random active fact
router.get('/random', async (req, res) => {
  try {
    const facts = await Fact.find({ is_active: true });
    if (!facts.length) return res.status(404).json({ error: 'No active facts' });

    // Pick a random one
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    res.json(randomFact);
  } catch (err) {
    console.error("Error fetching random fact:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// -----------------------------
// Get all facts
// -----------------------------

router.get("/", async (req, res) => {
  try {
    const facts = await Fact.find();
    res.json(facts);
  } catch (err) {
    console.error("Error fetching facts:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// --------------------
// Send a daily Fact 
// --------------------

router.post("/send", async (req, res) => {
  try {
    // Get all active users
    const users = await User.find({ active: true });
    if (!users.length) {
      return res.status(404).json({ message: "No active users found." });
    }

    // Get all active facts
    const facts = await Fact.find({ is_active: true });
    if (!facts.length) {
      return res.status(404).json({ message: "No active facts found." });
    }

    // Pick a random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    console.log("Sending daily fact:", randomFact.fact_text);

    let successCount = 0;
    let failCount = 0;

    // Send email to each user
    for (const user of users) {
      if (!user.email) continue; // skip if user has no email

      try {
        await sendEmail({
          email: user.email,
          subject: "📌 Your Daily Fact!",
          html: dailyFactEmail(user, randomFact),
        });

        console.log(` Email sent to ${user.email}`);
        successCount++;
      } catch (err) {
        console.error(` Failed to send email to ${user.email}:`, err.message);
        failCount++;
      }
    }

    res.json({
      message: "Daily fact emails processed.",
      fact: randomFact,
      summary: {
        sent: successCount,
        failed: failCount,
      },
    });
  } catch (err) {
    console.error("Error sending daily fact emails:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

