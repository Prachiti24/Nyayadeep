const express = require('express');
const Lesson = require('../models/Lesson');
const LessonProgress = require('../models/LessonProgress');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

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
router.post('/progress', fetchUser, async (req, res) => {
  try {
    const { lessonId, isCompleted } = req.body;
    const progress = await LessonProgress.findOneAndUpdate(
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
