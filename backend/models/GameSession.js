const GameSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameType: { type: String, enum: ['quiz','rapid_fire','match_article'], required: true },
  score: { type: Number, default: 0 },
  duration: { type: Number }, // in seconds
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('GameSession', GameSessionSchema);
