const movieService = require('../services/movieService');

// 1️⃣ Phim mới cập nhật
const getNewMovies = async (req, res) => {
  try {
    const data = await movieService.getNewMovies(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Chi tiết phim
const getMovieDetail = async (req, res) => {
  try {
    const data = await movieService.getMovieDetail(req.params.slug);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3️⃣ TMDB
const getByTMDB = async (req, res) => {
  try {
    const { type, id } = req.params;
    const data = await movieService.getByTMDB(type, id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4️⃣ Danh sách tổng hợp
const getMovieList = async (req, res) => {
  try {
    const { type_list } = req.params;
    const data = await movieService.getMovieList(type_list, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5️⃣ Tìm kiếm
const searchMovies = async (req, res) => {
  try {
    const data = await movieService.searchMovies(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6️⃣ Thể loại
const getGenres = async (req, res) => {
  try {
    const data = await movieService.getGenres();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGenreDetail = async (req, res) => {
  try {
    const data = await movieService.getGenreDetail(req.params.type_list, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 7️⃣ Quốc gia
const getCountries = async (req, res) => {
  try {
    const data = await movieService.getCountries();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCountryDetail = async (req, res) => {
  try {
    const data = await movieService.getCountryDetail(req.params.type_list, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 8️⃣ Năm phát hành
const getMoviesByYear = async (req, res) => {
  try {
    const data = await movieService.getMoviesByYear(req.params.type_list, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getNewMovies,
  getMovieDetail,
  getByTMDB,
  getMovieList,
  searchMovies,
  getGenres,
  getGenreDetail,
  getCountries,
  getCountryDetail,
  getMoviesByYear,
};
