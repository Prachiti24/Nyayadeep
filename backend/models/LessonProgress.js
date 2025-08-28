const LessonProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  lastViewedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LessonProgress', LessonProgressSchema);
