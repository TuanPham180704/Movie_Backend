const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");


router.get("/", movieController.getMovies);


router.get("/:slug", movieController.getMovieDetail);


router.get("/:slug/video", movieController.getMovieVideo);

module.exports = router;



