// backend/models/Lesson.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  quiz: [QuestionSchema],
});

const LessonSchema = new Schema(
  {
    lesson_number: { type: Number, required: true },
    lesson_title: { type: String, required: true },
    description: { type: String },
    articles: [ArticleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", LessonSchema);
