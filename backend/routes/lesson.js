const express = require('express');
const Lesson = require('../models/Lesson');
const UserProgress = require('../models/UserProgress');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Get lessons in a section (published)
router.get('/section/:sectionId', async (req, res) => {
  try {
    const lessons = await Lesson.find({ sectionId: req.params.sectionId, isPublished: true }).sort('displayOrder');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark lesson progress
router.post('/progress', authMiddleware, async (req, res) => {
  try {
    const { lessonId, isCompleted } = req.body;
    const progress = await UserProgress.findOneAndUpdate(
      { userId: req.user.id, lessonId },
      { isCompleted, lastViewedAt: Date.now(), completedAt: isCompleted ? Date.now() : null },
      { upsert: true, new: true }
    );
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
