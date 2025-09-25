const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    article_number: { type: String, required: true },
    article_title: { type: String, required: true },
    part_id: { type: Schema.Types.ObjectId, ref: 'Part', required: true },
    lesson_id: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    original_text: { type: String, required: true },
    simplified_text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
