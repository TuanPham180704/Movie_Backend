const axios = require('axios');

async function proxyVideo(req, res, videoUrl) {
  try {
    const response = await axios({
      url: videoUrl,
      method: 'GET',
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    res.setHeader('Content-Type', 'video/mp4');
    response.data.pipe(res);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: 'Failed to stream video' });
  }
}

module.exports = proxyVideo;
