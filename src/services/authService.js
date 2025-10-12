const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_ROUNDS = 10;


async function register(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const res = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id, username, email',
    [username, email, hashedPassword]
  );
  return res.rows[0];
}


async function login(email, password) {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if (!res.rows.length) throw new Error('User not found');

  const user = res.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect password');

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
}


async function getProfile(userId) {
  const res = await pool.query('SELECT id, username, email FROM users WHERE id=$1', [userId]);
  return res.rows[0];
}


async function updateProfile(userId, username, email) {
  const res = await pool.query(
    'UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id, username, email',
    [username, email, userId]
  );
  return res.rows[0];
}

module.exports = { register, login, getProfile, updateProfile };
