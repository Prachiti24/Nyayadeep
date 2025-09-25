const mongoose = require('mongoose');
const { Schema } = mongoose;

const LessonSchema = new Schema({
    lesson_number: { type: Number, required: true },
    part_id: { type: Schema.Types.ObjectId, ref: 'Part', required: true },
    lesson_title: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
