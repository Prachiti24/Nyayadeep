const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  xp: { type: Number, default: 0 },
  streaks: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  lastViewed: { type: Date, default: Date.now },
  completedLessons: { type: [String], default: [] } // to track lessons
});

module.exports = mongoose.model("Progress", ProgressSchema);