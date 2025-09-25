const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    xpTotal: { type: Number, default: 0 },
    currentStreakDays: { type: Number, default: 0 },
    longestStreakDays: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now },
    telegramId: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
