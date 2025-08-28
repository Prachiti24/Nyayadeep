const DailyFactSchema = new Schema({
  factText: { type: String, required: true },
  tags: [{ type: String }],
  weight: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('DailyFact', DailyFactSchema);
