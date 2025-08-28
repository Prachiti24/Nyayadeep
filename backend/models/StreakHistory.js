const StreakHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startOn: { type: Date, required: true },
  endOn: { type: Date },
  lengthDays: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StreakHistory', StreakHistorySchema);
