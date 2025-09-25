const mongoose = require('mongoose');
const { Schema } = mongoose;

const FundamentalDutiesSchema = new Schema({
    article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    original_text: { type: String, required: true },
    simplified_text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FundamentalDuties', FundamentalDutiesSchema);
