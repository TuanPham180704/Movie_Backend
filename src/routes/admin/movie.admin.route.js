const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const adminMiddleware = require('../../middlewares/adminMiddleware');

// Lấy danh sách phim
router.get('/', adminMiddleware, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM movies ORDER BY id DESC');
  res.json(rows);
});

// Thêm phim
router.post('/', adminMiddleware, async (req, res) => {
  const { slug, title, description, cover_url, poster_url, release_year, country } = req.body;
  const query = `
    INSERT INTO movies (slug, title, description, cover_url, poster_url, release_year, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [slug, title, description, cover_url, poster_url, release_year, country];
  const { rows } = await pool.query(query, values);
  res.json(rows[0]);
});

// Cập nhật phim
router.put('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, cover_url, poster_url, release_year, country } = req.body;
  const query = `
    UPDATE movies SET title=$1, description=$2, cover_url=$3, poster_url=$4, release_year=$5, country=$6
    WHERE id=$7 RETURNING *`;
  const values = [title, description, cover_url, poster_url, release_year, country, id];
  const { rows } = await pool.query(query, values);
  res.json(rows[0]);
});

// Xóa phim
router.delete('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM movies WHERE id=$1', [id]);
  res.json({ message: 'Movie deleted successfully' });
});

module.exports = router;
