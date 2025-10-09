const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Import routes
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const favoriteRoutes = require('./routes/favorite');
const historyRoutes = require('./routes/history');
const commentRoutes = require('./routes/comment');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('🎬 KKPhim Backend Running...'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/api/movies', movieRoutes);
app.use('/api/movies', favoriteRoutes);
app.use('/api/movies', historyRoutes);
app.use('/api/movies', commentRoutes);

app.use('/api', searchRoutes);

module.exports = app;
