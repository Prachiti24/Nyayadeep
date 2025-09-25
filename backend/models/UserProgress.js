const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserProgressSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    unit_id: { type: Schema.Types.ObjectId, ref: 'ConstitutionUnit', required: true },
    completed: { type: Boolean, default: false },
    xp_earned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);
