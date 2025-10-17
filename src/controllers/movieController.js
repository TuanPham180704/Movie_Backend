const movieService = require('../services/movieService');

async function getMovies(req, res) {
  const page = parseInt(req.query.page) || 1;
  const movies = await movieService.fetchNewMovies(page);

  if (!movies.length) return res.status(404).json({ message: 'Không tìm thấy phim nào' });

  res.json({
    page,
    total: movies.length,
    movies,
  });
}

async function getMovieDetail(req, res) {
  const { slug } = req.params;
  const movie = await movieService.fetchMovieDetail(slug);

  if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });

  const videoUrl = await movieService.getVideoUrl(slug, 1);

  res.json({
    slug,
    title: movie.movie?.name || movie.name,
    description: movie.movie?.content || movie.content,
    year: movie.movie?.year || movie.year,
    poster_url: movie.movie?.thumb_url || movie.poster_url,
    videoUrl,
  });
}

async function getMovieVideo(req, res) {
  const { slug } = req.params;
  const episode = req.query.episode || 1;
  const url = await movieService.getVideoUrl(slug, episode);

  if (!url) return res.status(404).json({ message: 'Không tìm thấy link video' });

  res.json({ slug, episode, videoUrl: url });
}
async function getMoviesByType(req, res) {
  const { type_list } = req.params;
  const movies = await movieService.fetchMoviesByType(type_list, req.query);
  res.json({ type_list, movies });
}

async function searchMovies(req, res) {
  const { keyword } = req.query;
  const movies = await movieService.searchMovies(keyword, req.query);
  if (!movies) return res.status(404).json({ message: 'Không tìm thấy phim' });
  res.json({ keyword, movies });
}

async function getCategories(req, res) {
  const categories = await movieService.fetchCategories();
  if (!categories) return res.status(404).json({ message: 'Không tìm thấy thể loại phim' });
  res.json(categories);
}

async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  const movies = await movieService.fetchMoviesByCategory(category, req.query);
  if (!movies) return res.status(404).json({ message: 'Không tìm thấy phim' });
  res.json({ category, movies });
}

async function getCountries(req, res) {
  const countries = await movieService.fetchCountries();
  if (!countries) return res.status(404).json({ message: 'Không tìm thấy phim theo quốc gia' });
  res.json(countries);
}

async function getMoviesByCountry(req, res) {
  const { country } = req.params;
  const movies = await movieService.fetchMoviesByCountry(country, req.query);
  if (!movies) return res.status(404).json({ message: 'Không tìm thấy phim theo quốc gia' });
  res.json({ country, movies });
}

async function getMoviesByYear(req, res) {
  const { year } = req.params;
  const movies = await movieService.fetchMoviesByYear(year, req.query);
  if (!movies) return res.status(404).json({ message: 'Không tìm thấy phim theo năm này' });
  res.json({ year, movies });
}

module.exports = {
  getMovies,
  getMovieDetail,
  getMovieVideo,
  getMoviesByType,
  searchMovies,
  getCategories,
  getMoviesByCategory,
  getCountries,
  getMoviesByCountry,
  getMoviesByYear,
};
