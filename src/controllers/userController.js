const { getProfile, updateProfile } = require('../services/authService');

async function getMe(req, res) {
  try {
    const user = await getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateMe(req, res) {
  const { username, email } = req.body;
  try {
    const updatedUser = await updateProfile(req.user.id, username, email);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getMe, updateMe };
