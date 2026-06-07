const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, unlikePost, getMisLikes } = require('../controllers/post.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getPosts);
router.get('/mis-likes', protect, getMisLikes);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);
router.delete('/:id/like', protect, unlikePost);

module.exports = router;