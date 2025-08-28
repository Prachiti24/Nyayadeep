const AttemptOptionSchema = new Schema({
  attemptId: { type: Schema.Types.ObjectId, ref: 'QuestionAttempt', required: true },
  optionId: { type: Schema.Types.ObjectId, ref: 'Option', required: true }
}, { timestamps: true });

module.exports = mongoose.model('AttemptOption', AttemptOptionSchema);
