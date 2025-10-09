const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/search', searchController.searchMovies);

router.get('/category/:category', searchController.getMoviesByCategory);

router.get('/trending', searchController.getTrendingMovies);

module.exports = router;
