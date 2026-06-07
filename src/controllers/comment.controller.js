const Comment = require('../models/Comment');

// Agregar comentario
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'El comentario no puede estar vacío' });
    }

    const comment = await Comment.create({
      post_id: postId,
      user_id: req.user._id,
      author_username: req.user.username,
      content
    });

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener comentarios de un post
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post_id: postId }).sort({ created_at: 1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getComments };