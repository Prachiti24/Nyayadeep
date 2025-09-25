const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    number_of_questions: { type: Number, required: true },
    total_xp: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
