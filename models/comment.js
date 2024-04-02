const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  postId: { type: Number, index: true },
  id: Number,
  name: String,
  email: { type: String, index: true },
  body: String
});

commentsSchema.index({ postId: 1 });

module.exports = mongoose.model('Comment', commentsSchema, 'Comments');
