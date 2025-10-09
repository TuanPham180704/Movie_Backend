const axios = require('axios');
require('dotenv').config();

const KKPHIM_API = process.env.KKPHIM_API_URL || 'https://phimapi.com';

async function searchMovies({ keyword = '', page = 1, sort = '', type = '', country = '', year = '' }) {
  try {
    const url = `${KKPHIM_API}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.data?.items || [];
  } catch (err) {
    console.error('Search error:', err.message);
    return [];
  }
}

async function getMoviesByCategory(category, page = 1) {
  try {
    const url = `${KKPHIM_API}/v1/api/the-loai/${encodeURIComponent(category)}?page=${page}`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.data?.items || [];
  } catch (err) {
    console.error('Category fetch error:', err.message);
    return [];
  }
}

async function getTrendingMovies() {
  try {
    const url = `${KKPHIM_API}/v1/api/danh-sach/phim-hot`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.data?.items || [];
  } catch (err) {
    console.error('Trending fetch error:', err.message);
    return [];
  }
}

module.exports = {
  searchMovies,
  getMoviesByCategory,
  getTrendingMovies,
};
