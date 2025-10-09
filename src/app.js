const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => res.send('KKPhim Backend Running'));

module.exports = app;
