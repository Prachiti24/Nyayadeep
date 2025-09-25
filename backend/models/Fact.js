const mongoose = require('mongoose');
const { Schema } = mongoose;

const FactSchema = new Schema({
    fact_text: { type: String, required: true },
    source: { type: String },
    related_unit_id: { type: Schema.Types.ObjectId, ref: 'ConstitutionUnit' },
    created_at: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Fact', FactSchema);
