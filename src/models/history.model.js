const pool = require('../config/db');

class History {
  static async create({ user_id, movie_id, episode_id }) {
    const query = `
      INSERT INTO history (user_id, movie_id, episode_id, watched_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [user_id, movie_id, episode_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUser(user_id) {
    const query = `
    SELECT h.*, m.title, m.cover_url AS thumb_url
    FROM history h
    JOIN movies m ON h.movie_id = m.id
    WHERE h.user_id = $1
    ORDER BY h.watched_at DESC;
  `;
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  }

  static async updateWatchTime(id) {
    await pool.query(`UPDATE history SET watched_at = NOW() WHERE id = $1`, [id]);
  }

  static async findExisting(user_id, movie_id, episode_id) {
    const query = `
      SELECT * FROM history
      WHERE user_id = $1 AND movie_id = $2 AND episode_id = $3
      LIMIT 1;
    `;
    const { rows } = await pool.query(query, [user_id, movie_id, episode_id]);
    return rows[0];
  }
}

module.exports = History;
