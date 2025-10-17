const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  getMeController,
  updateMeController,
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', authMiddleware, getMeController);
router.put('/me', authMiddleware, updateMeController);

module.exports = router;
