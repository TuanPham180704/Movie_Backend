const movieService = require('../services/movieService');

// 🎬 Lấy danh sách phim mới cập nhật
async function getMovies(req, res) {
  const page = parseInt(req.query.page) || 1;
  const movies = await movieService.fetchNewMovies(page);
  if (!movies || !movies.length)
    return res.status(404).json({ message: 'Không tìm thấy phim nào' });

  res.json({
    page,
    total: movies.length,
    movies,
  });
}

// 🎥 Chi tiết phim theo slug
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

// 🎞️ Lấy link video theo slug + tập
async function getMovieVideo(req, res) {
  const { slug } = req.params;
  const episode = req.query.episode || 1;
  const url = await movieService.getVideoUrl(slug, episode);
  if (!url)
    return res.status(404).json({ message: 'Không tìm thấy link video' });

  res.json({ slug, episode, videoUrl: url });
}

// 🔖 Lấy phim theo type (phim-le, phim-bo, hoat-hinh...)
async function getMoviesByType(req, res) {
  const { type } = req.params;
  const movies = await movieService.fetchMoviesByType(type, req.query);
  if (!movies || !movies.length)
    return res.status(404).json({ message: 'Không tìm thấy phim theo type' });
  res.json({ type, movies });
}

// 🔍 Tìm kiếm phim
async function searchMovies(req, res) {
  const keyword = req.query.q || req.query.keyword;
  if (!keyword)
    return res.status(400).json({ message: 'Thiếu từ khóa tìm kiếm (q)' });

  const movies = await movieService.searchMovies(keyword, req.query);
  if (!movies || !movies.length)
    return res.status(404).json({ message: 'Không tìm thấy phim phù hợp' });
  res.json({ keyword, movies });
}

// 🗂️ Danh sách thể loại phim
async function getCategories(req, res) {
  const categories = await movieService.fetchCategories();
  if (!categories || !categories.length)
    return res.status(404).json({ message: 'Không tìm thấy thể loại phim' });
  res.json(categories);
}

// 🎭 Lấy phim theo thể loại
async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  const movies = await movieService.fetchMoviesByCategory(category, req.query);
  if (!movies || !movies.length)
    return res
      .status(404)
      .json({ message: `Không tìm thấy phim trong thể loại ${category}` });
  res.json({ category, movies });
}

// 🌍 Danh sách quốc gia
async function getCountries(req, res) {
  const countries = await movieService.fetchCountries();
  if (!countries || !countries.length)
    return res.status(404).json({ message: 'Không tìm thấy danh sách quốc gia' });
  res.json(countries);
}

// 🇻🇳 Lấy phim theo quốc gia
async function getMoviesByCountry(req, res) {
  const { country } = req.params;
  const movies = await movieService.fetchMoviesByCountry(country, req.query);
  if (!movies || !movies.length)
    return res
      .status(404)
      .json({ message: `Không tìm thấy phim theo quốc gia ${country}` });
  res.json({ country, movies });
}

// 📅 Lấy phim theo năm
async function getMoviesByYear(req, res) {
  const { year } = req.params;
  const movies = await movieService.fetchMoviesByYear(year, req.query);
  if (!movies || !movies.length)
    return res
      .status(404)
      .json({ message: `Không tìm thấy phim phát hành năm ${year}` });
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
