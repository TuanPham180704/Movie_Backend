const { addComment, getComments, deleteComment } = require('../services/userInteractionService');

async function postComment(req, res) {
  try {
    const { content } = req.body;
    const result = await addComment(req.user.id, req.params.slug, content);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getCommentsController(req, res) {
  try {
    const result = await getComments(req.params.slug);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteCommentController(req, res) {
  try {
    const isAdmin = req.user.isAdmin || false;
    const result = await deleteComment(req.params.id, req.user.id, isAdmin);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { postComment, getCommentsController, deleteCommentController };
