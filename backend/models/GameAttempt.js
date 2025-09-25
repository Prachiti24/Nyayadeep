const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameAttemptSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game_type: { type: String, required: true, enum: ['memory_match', 'flashcards', 'timed_quiz', 'puzzle'] },
    score: { type: Number, required: true },
    xp_earned: { type: Number, required: true },
    attempt_date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GameAttempt', GameAttemptSchema);
