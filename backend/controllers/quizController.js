const QuizResult = require("../models/QuizResult");

exports.saveQuizResult = async (req, res) => {
  try {
    const { userId, lessonId, score, total } = req.body;

    if (!userId || !lessonId)
      return res.status(400).json({ message: "Missing user or lesson ID" });

    const result = new QuizResult({ userId, lessonId, score, total });
    await result.save();

    res.status(201).json({ message: "Quiz result saved", result });
  } catch (error) {
    console.error("❌ Error saving quiz result:", error);
    res.status(500).json({ message: "Server error" });
  }
};