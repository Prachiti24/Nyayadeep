const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizQuestionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true }
}, { timestamps: true });

module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
