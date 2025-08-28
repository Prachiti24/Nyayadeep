const TopicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Topic', TopicSchema);
