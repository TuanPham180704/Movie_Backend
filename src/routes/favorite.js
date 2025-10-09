const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  postFavorite,
  deleteFavoriteController,
  getFavoritesController,
} = require('../controllers/favoriteController');

router.post('/:slug/favorite', authMiddleware, postFavorite);
router.delete('/:slug/favorite', authMiddleware, deleteFavoriteController);
router.get('/me/favorites', authMiddleware, getFavoritesController);

module.exports = router;
