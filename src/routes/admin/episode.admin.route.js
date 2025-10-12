const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const adminMiddleware = require('../../middlewares/adminMiddleware');

router.get('/', adminMiddleware, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM episodes ORDER BY id DESC');
  res.json(rows);
});

router.post('/', adminMiddleware, async (req, res) => {
  const { movie_id, title, url, episode_number } = req.body;
  const query = `
    INSERT INTO episodes (movie_id, title, url, episode_number)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [movie_id, title, url, episode_number]);
  res.json(rows[0]);
});

router.delete('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM episodes WHERE id=$1', [id]);
  res.json({ message: 'Episode deleted successfully' });
});

module.exports = router;
