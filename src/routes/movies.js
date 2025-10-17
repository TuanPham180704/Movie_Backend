const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);

router.get('/search', movieController.searchMovies);
router.get('/type/:type_list', movieController.getMoviesByType);
router.get('/categories', movieController.getCategories);
router.get('/category/:category', movieController.getMoviesByCategory);
router.get('/countries', movieController.getCountries);
router.get('/country/:country', movieController.getMoviesByCountry);
router.get('/year/:year', movieController.getMoviesByYear);

// Đặt cuối cùng
router.get('/:slug', movieController.getMovieDetail);
router.get('/:slug/video', movieController.getMovieVideo);

module.exports = router;
