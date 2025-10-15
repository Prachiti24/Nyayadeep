const express = require('express');
const Question = require('../models/Question');
const Option = require('../models/Option');
const UserQuizAttempt = require('../models/UserQuizAttempt');
const GameAttempt = require('../models/GameAttempt');
const Progress = require('../models/Progress');
const router = express.Router();

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
router.post('/attempt', async (req, res) => {
  try {
    const { quizId, score, totalQuestions, correctAnswers, topicId } = req.body;
    const userId = req.user.id;

    // Create quiz attempt
    const attempt = await UserQuizAttempt.create({
      user_id: userId,
      quiz_id: quizId,
      score,
      total_questions: totalQuestions,
      correct_answers: correctAnswers
    });

    // Calculate XP based on performance
    const percentage = (correctAnswers / totalQuestions) * 100;
    let xpEarned = 0;

    if (percentage >= 90) xpEarned = 25; // Excellent
    else if (percentage >= 75) xpEarned = 20; // Good
    else if (percentage >= 60) xpEarned = 15; // Satisfactory
    else if (percentage >= 40) xpEarned = 10; // Needs improvement
    else xpEarned = 5; // Poor

    // Update progress with quiz completion
    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({ userId });
    }

    progress.xp += xpEarned;

    // Add quiz to completed lessons if not already there
    const quizLessonId = `quiz_${quizId}`;
    const existingQuiz = progress.completedLessons.find(l => l.lessonId === quizLessonId);
    if (!existingQuiz) {
      progress.completedLessons.push({
        lessonId: quizLessonId,
        lastPosition: `Score: ${score}/${totalQuestions}`,
        isCompleted: true
      });
    }

    // Check for badges
    const quizCount = progress.completedLessons.filter(l => l.lessonId.startsWith('quiz_')).length;
    if (quizCount >= 5 && !progress.badges.includes('Quiz Master')) {
      progress.badges.push('Quiz Master');
    }

    // Update streak
    const today = new Date();
    if (!progress.lastViewed || (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) >= 1) {
      const diff = progress.lastViewed ? (today - new Date(progress.lastViewed)) / (1000 * 60 * 60 * 24) : 0;
      if (diff <= 2) {
        progress.streaks += 1;
      } else {
        progress.streaks = 1;
      }
      progress.lastViewed = today;
    }

    await progress.save();

    res.json({
      attempt,
      xpEarned,
      progress
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
