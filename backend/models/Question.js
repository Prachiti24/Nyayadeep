const QuestionSchema = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  questionText: { type: String, required: true },
  type: { type: String, enum: ['single_choice','multi_select','true_false','short_answer'], default: 'single_choice' },
  difficulty: { type: String, enum: ['easy','medium','hard'], default: 'medium' },
  explanation: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
