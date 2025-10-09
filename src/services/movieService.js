const axios = require('axios');
const pool = require('../config/db');

const KKPHIM_API_URL = process.env.KKPHIM_API_URL.trim(); // ⚡ remove newline

// Lấy danh sách phim mới từ KKPhim
async function fetchNewMovies(page = 1) {
  try {
    const res = await axios.get(`${KKPHIM_API_URL}?page=${page}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }, // tránh bị block
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching new movies:', err.message);
    return [];
  }
}

// Lấy chi tiết phim theo slug
async function fetchMovieDetail(slug) {
  try {
    const res = await axios.get(`https://phimapi.com/movie/${slug}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching movie detail:', err.message);
    return null;
  }
}

// Lưu metadata phim vào PostgreSQL
async function saveMoviesToDB(movies) {
  for (const m of movies) {
    const { slug, title, description, cover_url, poster_url, release_year, country } = m;
    await pool.query(
      `INSERT INTO movies (slug, title, description, cover_url, poster_url, release_year, country)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO UPDATE
       SET title=EXCLUDED.title, description=EXCLUDED.description`,
      [slug, title, description, cover_url, poster_url, release_year, country]
    );
  }
}

module.exports = { fetchNewMovies, fetchMovieDetail, saveMoviesToDB };
