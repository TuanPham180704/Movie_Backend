const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/new', movieController.getNewMovies);
router.get('/search', movieController.searchMovies);
router.get('/genres', movieController.getGenres);
router.get('/countries', movieController.getCountries);
router.get('/:slug', movieController.getMovieDetail);
router.get('/tmdb/:type/:id', movieController.getByTMDB);
router.get('/list/:type_list', movieController.getMovieList);
router.get('/genres/:type_list', movieController.getGenreDetail);
router.get('/countries/:type_list', movieController.getCountryDetail);
router.get('/years/:type_list', movieController.getMoviesByYear);
module.exports = router;
