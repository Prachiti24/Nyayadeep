const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConstitutionUnitSchema = new Schema({
    type: { type: String, required: true, enum: ['part', 'lesson', 'article'] },
    ref_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ConstitutionUnit', ConstitutionUnitSchema);
