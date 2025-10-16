const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");


router.get("/", movieController.getMovies);


router.get("/:slug", movieController.getMovieDetail);

// Lấy link video của 1 phim (tùy tập)
router.get("/:slug/video", movieController.getMovieVideo);

module.exports = router;
