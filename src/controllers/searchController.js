const searchService = require('../services/searchService');

exports.searchMovies = async (req, res) => {
  try {
    const { keyword, page, sort, type, country, year } = req.query;
    const movies = await searchService.searchMovies({ keyword, page, sort, type, country, year });
    res.json({ success: true, data: movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};

exports.getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page } = req.query;
    const movies = await searchService.getMoviesByCategory(category, page);
    res.json({ success: true, data: movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Category fetch failed' });
  }
};

exports.getTrendingMovies = async (req, res) => {
  try {
    const movies = await searchService.getTrendingMovies();
    res.json({ success: true, data: movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Trending fetch failed' });
  }
};
