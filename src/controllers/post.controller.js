const Post = require('../models/Post');
const Like = require('../models/Like');

// Crear post
const createPost = async (req, res) => {
  try {
    const { content, media_url, tags } = req.body;

    const post = await Post.create({
      author_id: req.user.id,
      author_username: req.user.username,
      author_avatar_url: req.user.avatar_url || '',
      content,
      media_url,
      tags
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dar like
const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Like.create({ post_id: id, user_id: req.user.id });
    await Post.findByIdAndUpdate(id, { $inc: { likes_count: 1 } });

    res.json({ message: 'Like agregado' });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya diste like a este post' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Quitar like
const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Like.findOneAndDelete({ post_id: id, user_id: req.user.id });
    await Post.findByIdAndUpdate(id, { $inc: { likes_count: -1 } });

    res.json({ message: 'Like eliminado' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMisLikes = async (req, res) => {
  try {
    const likes = await Like.find({ user_id: req.user._id });
    const postIds = likes.map(l => l.post_id.toString());
    res.json(postIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createPost, getPosts, likePost, unlikePost, getMisLikes };