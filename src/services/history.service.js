const History = require('../models/history.model');

const HistoryService = {
  async saveWatchHistory(userId, movieId, episodeId = null) {
    const existing = await History.findExisting(userId, movieId, episodeId);

    if (existing) {
      await History.updateWatchTime(existing.id);
      return existing;
    }

    return await History.create({
      user_id: userId,
      movie_id: movieId,
      episode_id: episodeId,
    });
  },

  async getUserHistory(userId) {
    return await History.findByUser(userId);
  },
};

module.exports = HistoryService;
