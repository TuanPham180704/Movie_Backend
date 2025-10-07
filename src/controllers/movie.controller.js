const db = require('../config/db');


const getAllMovies = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM movies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addMovie = async (req, res) => {
  try {
    const { title, overview, release_date, popularity } = req.body;
    const result = await db.query(
      `INSERT INTO movies (title, overview, release_date, popularity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, overview, release_date, popularity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllMovies, addMovie };
