const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const adminMiddleware = require('../../middlewares/adminMiddleware');

router.get('/', adminMiddleware, async (req, res) => {
  const { rows } = await pool.query('SELECT id, username, email, role, created_at FROM users');
  res.json(rows);
});

router.delete('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
