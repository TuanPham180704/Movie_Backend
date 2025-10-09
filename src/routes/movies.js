const express = require('express');
const router = express.Router();
const axios = require('axios');
const BASE_URL = process.env.KKPHIM_API_URL;

// ✅ GET /api/movies/trending
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat`);
    res.json(response.data.items);
  } catch (error) {
    console.error('Error trending:', error.message);
    res.status(500).json({ error: 'Failed to get trending movies' });
  }
});

// ✅ GET /api/movies/search?keyword=&page=&type=&country=&year=
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

// ✅ GET /api/movies/category/:category
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
