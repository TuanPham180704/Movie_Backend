const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/movies', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/', (req, res) => res.send('🎬 KKPhim Backend Running...'));

app.use('/auth', authRoutes);
app.use('/api/movies', movieRoutes);

module.exports = app;
