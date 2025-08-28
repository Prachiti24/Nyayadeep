const XPEventSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  source: { type: String, enum: ['lesson_complete','quiz_correct','streak_bonus','game','admin'], required: true },
  amount: { type: Number, required: true },
  occurredAt: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed } // store lessonId, questionId etc
}, { timestamps: true });

module.exports = mongoose.model('XPEvent', XPEventSchema);
