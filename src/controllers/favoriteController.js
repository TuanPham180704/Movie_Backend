const { addFavorite, removeFavorite, getFavorites } = require('../services/userInteractionService');

async function postFavorite(req, res) {
  try {
    const result = await addFavorite(req.user.id, req.params.slug);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteFavoriteController(req, res) {
  try {
    const result = await removeFavorite(req.user.id, req.params.slug);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  
}

async function getFavoritesController(req, res) {
  try {
    const result = await getFavorites(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { postFavorite, deleteFavoriteController, getFavoritesController };
