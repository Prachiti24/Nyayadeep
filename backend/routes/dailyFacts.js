// routes/factEmail.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Fact = require("../models/Fact");
const sendEmail = require("./../utils/email");

const {
  dailyFactEmail
} = require("./../helpers/EmailTemplate");

// -----------------------------
// Add a new fact
// -----------------------------

router.post("/", async (req, res) => {
  try {
    const { fact_text, source, related_unit_id, is_active } = req.body;

    const fact = new Fact({
      fact_text,
      source,
      related_unit_id,
      is_active: is_active ?? true,
    });

    await fact.save();
    res.status(201).json({ message: "Fact added successfully!", fact });
  } catch (err) {
    console.error("Error adding fact:", err);
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

