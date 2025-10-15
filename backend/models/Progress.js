const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  xp: { type: Number, default: 0 },
  streaks: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  lastViewed: { type: Date, default: Date.now },
  completedLessons: { type: [{ lessonId: String, lastPosition: String }], default: [] } // to track lessons with last position
});

module.exports = mongoose.model("Progress", ProgressSchema);