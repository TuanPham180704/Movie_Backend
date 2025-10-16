const HistoryService = require('../services/history.service');

const HistoryController = {
  async addHistory(req, res) {
    try {
      const userId = req.user_id.id;
      const { movieId, episodeId } = req.body;

      await HistoryService.saveWatchHistory(userId, movieId, episodeId);
      res.json({ message: 'Lưu lịch sử xem thành công!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Lỗi khi lưu lịch sử xem phim.' });
    }
  },

  async getHistory(req, res) {
    try {
      const userId = req.user.id;
      const data = await HistoryService.getUserHistory(userId);
      res.json(data);
    } catch (err) {
      console.error('❌ Lỗi getHistory:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
};

module.exports = HistoryController;
