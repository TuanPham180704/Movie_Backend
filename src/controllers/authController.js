const { register, login, getProfile, updateProfile } = require('../services/authService');

async function registerController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing Fields' });
  try {
    const user = await register(username, email, password);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getMeController(req, res) {
  try {
    const user = await getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateMeController(req, res) {
  const { username, email } = req.body;
  try {
    const updatedUser = await updateProfile(req.user.id, username, email);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registerController, loginController, getMeController, updateMeController };
