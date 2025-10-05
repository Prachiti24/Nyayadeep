const express = require('express');
const Question = require('../models/Question');
const Option = require('../models/Option');
const UserQuizAttempt = require('../models/UserQuizAttempt');
const GameAttempt = require('../models/GameAttempt');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

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
router.post('/attempt', authMiddleware, async (req, res) => {
  try {
    const attempt = await UserQuizAttempt.create({
      user_id: req.user.id,
      quiz_id: req.body.quizId,
      score: req.body.score,
      total_questions: req.body.totalQuestions,
      correct_answers: req.body.correctAnswers
    });
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
