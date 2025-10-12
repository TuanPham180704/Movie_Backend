const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const authMiddleware = require('../../middlewares/authMiddleware');
const adminMiddleware = require('../../middlewares/adminMiddleware');
const slugify = require('slugify'); 


router.use(authMiddleware, adminMiddleware);

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM movies ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { slug, title, description, cover_url, poster_url, release_year, country } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    let baseSlug = slug ? slug.toLowerCase() : slugify(title, { lower: true, strict: true });
    let finalSlug = baseSlug;
    let count = 1;
    while (true) {
      const check = await pool.query('SELECT id FROM movies WHERE slug=$1', [finalSlug]);
      if (check.rows.length === 0) break;
      finalSlug = `${baseSlug}-${count++}`;
    }

    const query = `
      INSERT INTO movies (slug, title, description, cover_url, poster_url, release_year, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;
    const values = [finalSlug, title, description, cover_url, poster_url, release_year, country];

    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating movie:', err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, cover_url, poster_url, release_year, country } = req.body;

    const query = `
      UPDATE movies 
      SET title=$1, description=$2, cover_url=$3, poster_url=$4, release_year=$5, country=$6
      WHERE id=$7 
      RETURNING *`;
    const values = [title, description, cover_url, poster_url, release_year, country, id];
    const { rows } = await pool.query(query, values);

    if (!rows.length) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM movies WHERE id=$1', [id]);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
