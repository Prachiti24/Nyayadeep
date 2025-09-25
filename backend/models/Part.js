const mongoose = require('mongoose');
const { Schema } = mongoose;

const PartSchema = new Schema({
    part_number: { type: String, required: true },
    part_title: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Part', PartSchema);
