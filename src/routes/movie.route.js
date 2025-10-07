const express = require('express');
const router = express.Router();
const { getAllMovies, addMovie } = require('../controllers/movie.controller');

router.get('/', getAllMovies);
router.post('/', addMovie);

module.exports = router;
