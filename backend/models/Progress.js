const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  xp: { type: Number, default: 0 },
  streaks: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  lastViewed: { type: Date, default: Date.now },
  lastStreakUpdate: { type: Date, default: Date.now }, // Track when streak was last updated
  completedLessons: { type: [{ lessonId: String, lastPosition: String, isCompleted: { type: Boolean, default: false } }], default: [] } // to track lessons with last position and completion status
});

module.exports = mongoose.model("Progress", ProgressSchema);