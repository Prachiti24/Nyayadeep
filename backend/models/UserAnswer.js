const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserAnswerSchema = new Schema({
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selected_option_ids: [Schema.Types.ObjectId],
    is_correct: { type: Boolean, required: true },
    attempt_id: { type: Schema.Types.ObjectId, required: true },
    attempt_type: { type: String, required: true, enum: ['UserQuizAttempt', 'GameAttempt'] }
}, { timestamps: true });

module.exports = mongoose.model('UserAnswer', UserAnswerSchema);
