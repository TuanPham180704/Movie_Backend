const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Tìm kiếm phim theo từ khóa + filter
router.get('/search', searchController.searchMovies);

// Lấy phim theo thể loại
router.get('/category/:category', searchController.getMoviesByCategory);

// Lấy phim trending (hot)
router.get('/trending', searchController.getTrendingMovies);

module.exports = router;
