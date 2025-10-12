const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = process.env.KKPHIM_API_URL || 'https://phimapi.com';
const proxyVideo = require('../utils/proxyStream');
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../config/db');

router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat`);
    res.json(response.data.items);
  } catch (error) {
    console.error('Error trending:', error.message);
    res.status(500).json({ error: 'Failed to get trending movies' });
  }
});

router.get('/search', async (req, res) => {
  const { keyword = '', page = 1, sort = 'moi-cap-nhat', type, country, year } = req.query;
  try {
    const url = `${BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error search:', error.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/v1/api/the-loai/${category}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error category:', error.message);
    res.status(500).json({ error: 'Failed to get category movies' });
  }
});

module.exports = router;

router.get('/:slug/stream/:episode', authMiddleware, async (req, res) => {
  try {
    const { slug, episode } = req.params;
    const movieRes = await pool.query('SELECT * FROM movies WHERE slug=$1', [slug]);
    if (movieRes.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    const movie = movieRes.rows[0];
    const kkphimUrl = `https://phimapi.com/phim/${slug}/tap-${episode}.json`;

    const axios = require('axios');
    const kkRes = await axios.get(kkphimUrl);
    const videoUrl = kkRes.data?.video || kkRes.data?.sources?.[0]?.file;
    if (!videoUrl) return res.status(404).json({ error: 'Video not found' });
    await proxyVideo(req, res, videoUrl);
  } catch (err) {
    console.error('Stream error:', err.message);
    res.status(500).json({ error: 'Failed to stream video' });
  }
});

module.exports = router;
