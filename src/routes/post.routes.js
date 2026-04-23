const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, unlikePost } = require('../controllers/post.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);
router.delete('/:id/like', protect, unlikePost);

module.exports = router;