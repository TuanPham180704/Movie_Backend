
const app = require('./app');
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello Movie');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
