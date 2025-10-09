const { register, login } = require('../services/authService');

async function registerController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await register(username, email, password);
    res.json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registerController, loginController };
