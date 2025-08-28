const express = require('express');
const Question = require('../models/Question');
const Option = require('../models/Option');
const QuestionAttempt = require('../models/QuestionAttempt');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

// Get all questions for a topic
router.get('/topic/:topicId', async (req, res) => {
  try {
    const questions = await Question.find({ topicId: req.params.topicId, isActive: true });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit an attempt
router.post('/attempt', fetchUser, async (req, res) => {
  try {
    const attempt = await QuestionAttempt.create({
      userId: req.user.id,
      questionId: req.body.questionId,
      isCorrect: req.body.isCorrect,
      answeredAt: new Date(),
      scoreDelta: req.body.scoreDelta,
      responseText: req.body.responseText || ''
    });
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
