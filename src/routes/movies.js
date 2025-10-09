const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { fetchNewMovies, fetchMovieDetail, saveMoviesToDB } = require('../services/movieService');

// GET /api/movies/new?page=1
router.get('/new', async (req, res) => {
  const page = Number(req.query.page) || 1;
  try {
    const movies = await fetchNewMovies(page);
    if (movies.length) await saveMoviesToDB(movies); // lưu vào DB
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch new movies' });
  }
});

// GET /api/movies/:slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    // check DB trước
    const dbRes = await pool.query('SELECT * FROM movies WHERE slug=$1', [slug]);
    if (dbRes.rows.length) return res.json(dbRes.rows[0]);

    // nếu chưa có, fetch API
    const movie = await fetchMovieDetail(slug);
    if (movie) await saveMoviesToDB([movie]);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie detail' });
  }
});

// GET /api/movies/search?keyword=xxx
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  try {
    const dbRes = await pool.query(`SELECT * FROM movies WHERE title ILIKE $1`, [`%${keyword}%`]);
    res.json(dbRes.rows);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/movies/popular
router.get('/popular', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT * FROM movies ORDER BY release_year DESC LIMIT 20');
    res.json(dbRes.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get popular movies' });
  }
});

module.exports = router;
