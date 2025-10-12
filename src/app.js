const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const favoriteRoutes = require('./routes/favorite');
const historyRoutes = require('./routes/history');
const commentRoutes = require('./routes/comment');
const searchRoutes = require('./routes/searchRoutes');
const adminMovieRoutes = require('./routes/admin/movie.admin.route');
const adminUserRoutes = require('./routes/admin/user.admin.route');
const adminEpisodeRoutes = require('./routes/admin/episode.admin.route');
const adminCommentRoutes = require('./routes/admin/comment.admin.route');
const app = express();
app.use(express.json());

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
app.use('/admin/movies', adminMovieRoutes);
app.use('/admin/users', adminUserRoutes);
app.use('/admin/episodes', adminEpisodeRoutes);
app.use('/admin/comments', adminCommentRoutes);
app.use('/api', searchRoutes);

module.exports = app;
