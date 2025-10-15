const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// GET user progress
router.get("/:userId", async (req, res) => { // authMiddleware removed for testing
    try {
        const progress = await Progress.findOne({ userId: req.params.userId });
        res.json(progress || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update XP
router.post("/xp-update", async (req, res) => {
    try {
        const { userId, xp } = req.body;
        const progress = await Progress.findOneAndUpdate(
        { userId },
        { $inc: { xp } },
        { new: true, upsert: true }
        );
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Streak calculation
router.post("/streak-check", async (req, res) => {
    try {
        const { userId } = req.body;
        let progress = await Progress.findOne({ userId });

        const today = new Date();
        if (!progress) {
        progress = new Progress({ userId, streaks: 1, lastViewed: today });
        } else {
        const last = new Date(progress.lastViewed);
        const diff = (today - last) / (1000 * 60 * 60 * 24);

        if (diff < 2) progress.streaks += 1;
        else progress.streaks = 1;

        progress.lastViewed = today;
        }

        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark lesson as completed (legacy, now handled in lesson progress)
router.post("/complete-lesson", async (req, res) => {
    try {
        const { userId, lessonId } = req.body;
        let progress = await Progress.findOne({ userId });

        if (!progress) {
            progress = new Progress({ userId });
        }

        const lessonIndex = progress.completedLessons.findIndex(l => l.lessonId === lessonId);
        if (lessonIndex >= 0) {
            progress.completedLessons[lessonIndex].isCompleted = true;
        } else {
            progress.completedLessons.push({ lessonId, lastPosition: '', isCompleted: true });
        }

        // Award XP
        progress.xp += 10;

        // Check for badges
        if (progress.xp >= 100 && !progress.badges.includes('First Steps')) {
            progress.badges.push('First Steps');
        }
        if (progress.completedLessons.filter(l => l.isCompleted).length >= 5 && !progress.badges.includes('Learner')) {
            progress.badges.push('Learner');
        }

        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Leaderboard
router.get("/leaderboard/top", async (req, res) => {
    try {
        const leaderboard = await Progress.find({})
        .populate("userId", "name email")
        .sort({ xp: -1 })
        .limit(10);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
