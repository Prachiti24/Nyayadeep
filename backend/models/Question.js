const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic' },
    unit_id: { type: Schema.Types.ObjectId, ref: 'ConstitutionUnit' },
    question_text: { type: String, required: true },
    type: { type: String, enum: ['single_choice', 'multi_select', 'true_false', 'short_answer'], required: true },
    difficulty: { type: Number, min: 1, max: 5 },
    explanation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
