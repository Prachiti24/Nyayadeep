const SectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  displayOrder: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Section', SectionSchema);
