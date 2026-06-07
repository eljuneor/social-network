const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/comment.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/:postId', getComments);
router.post('/:postId', protect, addComment);

module.exports = router;