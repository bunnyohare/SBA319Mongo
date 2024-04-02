const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: { type: String, index: true },
  body: String
});

postsSchema.index({ userId: 1 });

module.exports = mongoose.model('Post', postsSchema, 'Posts');


