const express = require('express');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const router = express.Router();

// Get lessons in a part
router.get('/part/:partId', async (req, res) => {
  try {
    const lessons = await Lesson.find({ part_id: req.params.partId }).sort('lesson_number');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single lesson by ID
router.get('/:lessonId', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('part_id');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update lesson progress (last position)
router.post('/progress', async (req, res) => {
  try {
    const { userId, lessonId, lastPosition, isCompleted } = req.body;
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({ userId });
    }

    const lessonIndex = progress.completedLessons.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex >= 0) {
      progress.completedLessons[lessonIndex].lastPosition = lastPosition;
      if (isCompleted && !progress.completedLessons[lessonIndex].isCompleted) {
        progress.completedLessons[lessonIndex].isCompleted = true;
        // Award XP for completion
        progress.xp += 10;
      }
    } else {
      progress.completedLessons.push({ lessonId, lastPosition, isCompleted: !!isCompleted });
      if (isCompleted) progress.xp += 10;
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
