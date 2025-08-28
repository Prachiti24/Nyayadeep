const DailyFactViewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  factId: { type: Schema.Types.ObjectId, ref: 'DailyFact', required: true },
  shownOn: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('DailyFactView', DailyFactViewSchema);
