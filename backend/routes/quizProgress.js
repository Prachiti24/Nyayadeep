const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');
const ConstitutionUnit = require('../models/ConstitutionUnit');

// POST /api/progress/update
router.post('/update', async (req, res) => {
  try {
    const { userId, unitName, score } = req.body;

    if (!userId || !unitName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Find the constitution unit (e.g., "lesson1")
    let unit = await ConstitutionUnit.findOne({ type: 'lesson', ref_id: unitName });

    // If unit doesn't exist, create it
    if (!unit) {
      unit = await ConstitutionUnit.create({
        type: 'lesson',
        ref_id: unitName,
      });
    }

    // XP logic (10 XP per correct answer)
    const xpEarned = score * 10;

    // Update or create user progress
    const progress = await UserProgress.findOneAndUpdate(
      { user_id: userId, unit_id: unit._id },
      { completed: true, xp_earned: xpEarned },
      { upsert: true, new: true }
    );

    // Update user's total XP
    await User.findByIdAndUpdate(userId, { $inc: { xpTotal: xpEarned } });

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      progress,
    });
  } catch (error) {
    console.error("❌ Error updating progress:", error);
    res.status(500).json({
      success: false,
      message: "Error updating progress",
    });
  }
});

// GET /api/quizProgress/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    // Find all progress entries for the user and populate the unit
    const progresses = await UserProgress.find({ user_id: userId }).populate('unit_id');

    const mapped = progresses.map((p) => ({
      unitName: p.unit_id ? p.unit_id.ref_id : null,
      completed: p.completed,
      xp_earned: p.xp_earned,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.status(200).json(mapped);
  } catch (error) {
    console.error('❌ Error fetching user quiz progress:', error);
    res.status(500).json({ success: false, message: 'Error fetching progress' });
  }
});

module.exports = router;
