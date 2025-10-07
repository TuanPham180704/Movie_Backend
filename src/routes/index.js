const express = require('express');
const router = express.Router();

// const movieRoutes = require('../routes/movie.route');

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running fine' });
});

// router.use('/movies', movieRoutes);

module.exports = router;
