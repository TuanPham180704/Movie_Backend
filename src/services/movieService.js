const axios = require('axios');
const pool = require('../config/db');

const BASE_URL = process.env.KKPHIM_API_URL?.trim() || 'https://phimapi.com';

async function fetchNewMovies(page = 1) {
  try {
    const res = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.data.items || [];
  } catch (err) {
    console.error('❌ Error fetching new movies:', err.message);
    return [];
  }
}


async function fetchMovieDetail(slug) {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${slug}`);
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching movie detail:', err.message);
    return null;
  }
}


async function saveMoviesToDB(movies) {
  for (const m of movies) {
    const { slug, name: title, content: description, poster_url, thumb_url, year, country } = m;
    await pool.query(
      `INSERT INTO movies (slug, title, description, poster_url, cover_url, release_year, country)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO UPDATE 
       SET title=EXCLUDED.title, description=EXCLUDED.description`,
      [slug, title, description, poster_url, thumb_url, year, country]
    );
  }
}


async function getVideoUrl(slug, episode) {
  const detail = await fetchMovieDetail(slug);
  if (!detail || !detail.episodes || detail.episodes.length === 0) return null;

  const epIndex = parseInt(episode) - 1 || 0;
  const server = detail.episodes[0];
  const ep = server.server_data?.[epIndex];

  if (!ep) return null;

  return ep.link_m3u8 || ep.link_embed || null;
}

module.exports = {
  fetchNewMovies,
  fetchMovieDetail,
  saveMoviesToDB,
  getVideoUrl,
};
