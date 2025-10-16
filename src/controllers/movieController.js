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

module.exports = {
  getMovies,
  getMovieDetail,
  getMovieVideo,
};
