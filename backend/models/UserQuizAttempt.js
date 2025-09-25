const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserQuizAttemptSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    xp_earned: { type: Number, required: true },
    attempt_date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('UserQuizAttempt', UserQuizAttemptSchema);
