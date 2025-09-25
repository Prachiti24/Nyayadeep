const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicUnitSchema = new Schema({
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    unit_id: { type: Schema.Types.ObjectId, ref: 'ConstitutionUnit', required: true }
}, { timestamps: true });

module.exports = mongoose.model('TopicUnit', TopicUnitSchema);
