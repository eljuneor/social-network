const mongoose = require('mongoose');

const editorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: String,
  role: {
    type: String,
    enum: ['editor', 'viewer'],
    default: 'viewer'
  }
}, { _id: false });

const postSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author_username: {
    type: String,
    required: true
  },
  author_avatar_url: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  media_url: {
    type: String,
    default: ''
  },
  tags: [String],
  editors: [editorSchema],
  likes_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Post', postSchema);