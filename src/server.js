require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Movie');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
