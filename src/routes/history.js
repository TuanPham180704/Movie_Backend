const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { postHistory, getHistoryController } = require('../controllers/historyController');

router.post('/:slug/history', authMiddleware, postHistory);
router.get('/me/history', authMiddleware, getHistoryController);

module.exports = router;
