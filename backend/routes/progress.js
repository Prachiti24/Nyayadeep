const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const User = require("../models/User")
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

// Streak calculation - Fixed to use server time and prevent multiple updates per day
router.post("/streak-check", async (req, res) => {
    try {
        const { userId } = req.body;
        let progress = await Progress.findOne({ userId });

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today in server time

        if (!progress) {
            progress = new Progress({
                userId,
                streaks: 1,
                lastViewed: today,
                lastStreakUpdate: today
            });
        } else {
            const lastUpdate = new Date(progress.lastStreakUpdate);
            const lastUpdateDate = new Date(lastUpdate.getFullYear(), lastUpdate.getMonth(), lastUpdate.getDate());

            // Only update streak if it's a new day
            if (today.getTime() > lastUpdateDate.getTime()) {
                const diffDays = Math.floor((today - lastUpdateDate) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    // Consecutive day - increment streak
                    progress.streaks += 1;
                } else if (diffDays > 1) {
                    // Gap in days - reset streak
                    progress.streaks = 1;
                }
                // If diffDays === 0, it's the same day, don't update

                progress.lastViewed = now;
                progress.lastStreakUpdate = today;
            }
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
    const leaderboard = await User.find({}, "name email xpTotal currentStreakDays longestStreakDays")
      .sort({ xpTotal: -1 })
      .limit(10);

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
