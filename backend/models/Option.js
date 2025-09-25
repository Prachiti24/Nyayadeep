const mongoose = require('mongoose');
const { Schema } = mongoose;

const OptionSchema = new Schema({
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    option_text: { type: String, required: true },
    is_correct: { type: Boolean, required: true },
    display_order: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Option', OptionSchema);
