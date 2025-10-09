const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => res.send('KKPhim Backend Running'));

module.exports = app;
