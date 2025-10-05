const express = require('express');
const Fact = require('../models/Fact');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Get random active fact
router.get('/random', authMiddleware, async (req, res) => {
  try {
    const facts = await Fact.find({ is_active: true });
    if (!facts.length) return res.status(404).json({ error: 'No active facts' });

    const fact = facts[Math.floor(Math.random() * facts.length)];

    // No DailyFactView model, so skipping view tracking

    res.json(fact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
