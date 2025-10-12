const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const adminMiddleware = require('../../middlewares/adminMiddleware');

router.get('/', adminMiddleware, async (req, res) => {
  const { rows } = await pool.query(`
    SELECT c.*, u.username, m.title AS movie_title
    FROM comments c
    JOIN users u ON c.user_id = u.id
    JOIN movies m ON c.movie_id = m.id
    ORDER BY c.id DESC
  `);
  res.json(rows);
});

router.delete('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM comments WHERE id=$1', [id]);
  res.json({ message: 'Comment deleted successfully' });
});

module.exports = router;
