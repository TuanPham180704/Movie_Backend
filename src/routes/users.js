const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getMe, updateMe } = require('../controllers/userController');

// GET /users/me
router.get('/me', authMiddleware, getMe);

// PUT /users/me
router.put('/me', authMiddleware, updateMe);

module.exports = router;
