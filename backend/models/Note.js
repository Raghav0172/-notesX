const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String },
  tags: [String],
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  uploaderId: { type: String, required: true },
  uploaderEmail: { type: String, required: true },
  approved: { type: Boolean, default: false },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

noteSchema.index({ title: 'text', subject: 'text', topic: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Note', noteSchema);
