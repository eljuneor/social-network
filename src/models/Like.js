const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

// Evita que un usuario le dé like dos veces al mismo post
likeSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);