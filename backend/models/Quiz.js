const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
    part_id: { type : Number},
    lesson_id: {type : Number}
    //topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    // number_of_questions: { type: Number, required: true },
    // total_xp: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
