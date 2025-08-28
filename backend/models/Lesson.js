const LessonSchema = new Schema({
  sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
  title: { type: String, required: true },
  content: { type: String }, // could be text/markdown/json
  displayOrder: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  estimatedMinutes: { type: Number, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
