const { addHistory, getHistory } = require('../services/userInteractionService');

async function postHistory(req, res) {
  try {
    const episodeId = req.body.episodeId || null;
    const result = await addHistory(req.user.id, req.params.slug, episodeId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getHistoryController(req, res) {
  try {
    const result = await getHistory(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { postHistory, getHistoryController };
