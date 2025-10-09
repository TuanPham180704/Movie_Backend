const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  postComment,
  getCommentsController,
  deleteCommentController,
} = require('../controllers/commentController');

router.post('/:slug/comment', authMiddleware, postComment);
router.get('/:slug/comments', getCommentsController);
router.delete('/:id', authMiddleware, deleteCommentController); 

module.exports = router;
