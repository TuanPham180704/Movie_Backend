const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/history.controller');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/history', authMiddleware, HistoryController.addHistory);


router.get('/users/me/history', authMiddleware, HistoryController.getHistory);

module.exports = router;
