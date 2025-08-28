const QuestionAttemptSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answeredAt: { type: Date, default: Date.now },
  isCorrect: { type: Boolean, default: false },
  scoreDelta: { type: Number, default: 0 },
  responseText: { type: String } // for short_answer
}, { timestamps: true });

module.exports = mongoose.model('QuestionAttempt', QuestionAttemptSchema);
