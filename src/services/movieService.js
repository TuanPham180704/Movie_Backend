import axios from 'axios';

const BASE_URL = 'https://example.com'; 


async function getVideoUrl(slug, episode = 1) {
  try {
    const detail = await fetchMovieDetail(slug);
    if (!detail || !detail.episodes || detail.episodes.length === 0) return null;

    const epIndex = parseInt(episode) - 1 || 0;
    const server = detail.episodes[0];
    const ep = server.server_data?.[epIndex];

    if (!ep) return null;
    return ep.link_m3u8 || ep.link_embed || null;
  } catch (error) {
    console.error('❌ Lỗi khi lấy video URL:', error);
    return null;
  }
}


async function fetchNewMovies(page = 1) {
  try {
    const res = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách phim mới:', error);
    return [];
  }
}

async function fetchMovieDetail(slug) {
  try {
    const res = await axios.get(`${BASE_URL}/phim/${slug}`);
    return res.data || null;
  } catch (error) {
    console.error('❌ Lỗi khi lấy chi tiết phim:', error);
    return null;
  }
}

async function fetchMoviesByType(type_list, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/v1/api/danh-sach/${type_list}?${query}`);
    return res.data.items || [];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy danh sách phim theo type (${type_list}):`, error);
    return [];
  }
}

async function searchMovies(keyword, params = {}) {
  try {
    const query = new URLSearchParams({ keyword, ...params }).toString();
    const res = await axios.get(`${BASE_URL}/v1/api/tim-kiem?${query}`);
    return res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi tìm kiếm phim:', error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get(`${BASE_URL}/the-loai`);
    return res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách thể loại:', error);
    return [];
  }
}

async function fetchMoviesByCategory(category, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/v1/api/the-loai/${category}?${query}`);
    return res.data.items || [];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy phim theo thể loại (${category}):`, error);
    return [];
  }
}

async function fetchCountries() {
  try {
    const res = await axios.get(`${BASE_URL}/quoc-gia`);
    return res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách quốc gia:', error);
    return [];
  }
}

async function fetchMoviesByCountry(country, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/v1/api/quoc-gia/${country}?${query}`);
    return res.data.items || [];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy phim theo quốc gia (${country}):`, error);
    return [];
  }
}

async function fetchMoviesByYear(year, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/v1/api/nam/${year}?${query}`);
    return res.data.items || [];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy phim theo năm (${year}):`, error);
    return [];
  }
}

export {
  getVideoUrl,
  fetchNewMovies,
  fetchMovieDetail,
  fetchMoviesByType,
  searchMovies,
  fetchCategories,
  fetchMoviesByCategory,
  fetchCountries,
  fetchMoviesByCountry,
  fetchMoviesByYear,
};
