const express = require('express');
const DailyFact = require('../models/DailyFact');
const DailyFactView = require('../models/DailyFactView');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

// Get random active fact
router.get('/random', fetchUser, async (req, res) => {
  try {
    const facts = await DailyFact.find({ isActive: true });
    if (!facts.length) return res.status(404).json({ error: 'No active facts' });

    const fact = facts[Math.floor(Math.random() * facts.length)];

    await DailyFactView.create({ userId: req.user.id, factId: fact.id, shownOn: new Date() });

    res.json(fact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
