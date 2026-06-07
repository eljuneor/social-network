const express = require('express');
const router = express.Router();
const { editarPerfil } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// PUT /api/users/me
router.put('/me', protect, editarPerfil);

module.exports = router;
