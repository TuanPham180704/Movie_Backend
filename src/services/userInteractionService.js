const pool = require('../config/db');

// === FAVORITE ===
async function addFavorite(userId, movieSlug) {
  const movieRes = await pool.query('SELECT id FROM movies WHERE slug=$1', [movieSlug]);
  if (!movieRes.rows.length) throw new Error('Movie not found');
  const movieId = movieRes.rows[0].id;

  await pool.query(
    `INSERT INTO favorites (user_id, movie_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, movieId]
  );
  return { message: 'Added to favorites' };
}

async function removeFavorite(userId, movieSlug) {
  const movieRes = await pool.query('SELECT id FROM movies WHERE slug=$1', [movieSlug]);
  if (!movieRes.rows.length) throw new Error('Movie not found');
  const movieId = movieRes.rows[0].id;

  await pool.query('DELETE FROM favorites WHERE user_id=$1 AND movie_id=$2', [userId, movieId]);
  return { message: 'Removed from favorites' };
}

async function getFavorites(userId) {
  const res = await pool.query(
    `SELECT m.* FROM movies m
     JOIN favorites f ON m.id=f.movie_id
     WHERE f.user_id=$1`,
    [userId]
  );
  return res.rows;
}

// === HISTORY ===
async function addHistory(userId, movieSlug, episodeId = null) {
  const movieRes = await pool.query('SELECT id FROM movies WHERE slug=$1', [movieSlug]);
  if (!movieRes.rows.length) throw new Error('Movie not found');
  const movieId = movieRes.rows[0].id;

  await pool.query(
    `INSERT INTO history (user_id, movie_id, episode_id)
     VALUES ($1, $2, $3)`,
    [userId, movieId, episodeId]
  );
  return { message: 'History added' };
}

async function getHistory(userId) {
  const res = await pool.query(
    `SELECT h.*, m.title, m.slug, e.title AS episode_title
     FROM history h
     JOIN movies m ON h.movie_id = m.id
     LEFT JOIN episodes e ON h.episode_id = e.id
     WHERE h.user_id=$1
     ORDER BY h.watched_at DESC`,
    [userId]
  );
  return res.rows;
}

// === COMMENT ===
async function addComment(userId, movieSlug, content) {
  const movieRes = await pool.query('SELECT id FROM movies WHERE slug=$1', [movieSlug]);
  if (!movieRes.rows.length) throw new Error('Movie not found');
  const movieId = movieRes.rows[0].id;

  const res = await pool.query(
    'INSERT INTO comments (user_id, movie_id, content) VALUES ($1,$2,$3) RETURNING *',
    [userId, movieId, content]
  );
  return res.rows[0];
}

async function getComments(movieSlug) {
  const movieRes = await pool.query('SELECT id FROM movies WHERE slug=$1', [movieSlug]);
  if (!movieRes.rows.length) throw new Error('Movie not found');
  const movieId = movieRes.rows[0].id;

  const res = await pool.query(
    `SELECT c.*, u.username
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.movie_id=$1
     ORDER BY c.created_at DESC`,
    [movieId]
  );
  return res.rows;
}

async function deleteComment(commentId, userId, isAdmin = false) {
  const res = await pool.query('SELECT * FROM comments WHERE id=$1', [commentId]);
  if (!res.rows.length) throw new Error('Comment not found');
  const comment = res.rows[0];

  if (!isAdmin && comment.user_id !== userId) throw new Error('Not authorized');

  await pool.query('DELETE FROM comments WHERE id=$1', [commentId]);
  return { message: 'Comment deleted' };
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
  addHistory,
  getHistory,
  addComment,
  getComments,
  deleteComment,
};
