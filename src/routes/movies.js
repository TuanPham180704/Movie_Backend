const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// 1️⃣ Danh sách phim mới cập nhật (v1, v2, v3)
router.get('/new', movieController.getNewMovies);

// 2️⃣ Thông tin phim & danh sách tập
router.get('/:slug', movieController.getMovieDetail);

// 3️⃣ Thông tin theo TMDB ID
router.get('/tmdb/:type/:id', movieController.getByTMDB);

// 4️⃣ Danh sách tổng hợp
router.get('/list/:type_list', movieController.getMovieList);

// 5️⃣ Tìm kiếm
router.get('/search', movieController.searchMovies);

// 6️⃣ Thể loại
router.get('/genres', movieController.getGenres);
router.get('/genres/:type_list', movieController.getGenreDetail);

// 7️⃣ Quốc gia
router.get('/countries', movieController.getCountries);
router.get('/countries/:type_list', movieController.getCountryDetail);

// 8️⃣ Năm phát hành
router.get('/years/:type_list', movieController.getMoviesByYear);

module.exports = router;
