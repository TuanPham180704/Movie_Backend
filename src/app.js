const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


module.exports = app;
