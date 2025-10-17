import axios from 'axios';

const BASE_URL = process.env.KKPHIM_API_URL || 'https://phimapi.com';

async function getVideoUrl(slug, episode = 1) {
  try {
    const detail = await fetchMovieDetail(slug);
    if (!detail || !detail.episodes || detail.episodes.length === 0) return null;

    const epIndex = parseInt(episode) - 1;
    const server = detail.episodes[0];
    const ep = server.server_data?.[epIndex];

    if (!ep) return null;
    return ep.link_m3u8 || ep.link_embed || null;
  } catch (error) {
    console.error('❌ Lỗi khi lấy video URL:', error.response?.data || error.message);
    return null;
  }
}

async function fetchNewMovies(page = 1) {
  try {
    const url = `${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    // Nếu API trả về { data: { items: [...] } }
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách phim mới:', error.response?.data || error.message);
    return [];
  }
}

async function fetchMovieDetail(slug) {
  try {
    const url = `${BASE_URL}/phim/${slug}`;
    const res = await axios.get(url);
    return res.data.data || res.data || null;
  } catch (error) {
    console.error('❌ Lỗi khi lấy chi tiết phim:', error.response?.data || error.message);
    return null;
  }
}

async function fetchMoviesByType(type_list, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/danh-sach/${type_list}?${query}`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error(
      `❌ Lỗi khi lấy danh sách phim theo type (${type_list}):`,
      error.response?.data || error.message
    );
    return [];
  }
}

async function searchMovies(keyword, params = {}) {
  try {
    const query = new URLSearchParams({ keyword, ...params }).toString();
    const url = `${BASE_URL}/tim-kiem?${query}`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi tìm kiếm phim:', error.response?.data || error.message);
    return [];
  }
}

async function fetchCategories() {
  try {
    const url = `${BASE_URL.replace('/v1/api', '')}/the-loai`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách thể loại:', error.response?.data || error.message);
    return [];
  }
}

async function fetchMoviesByCategory(category, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/the-loai/${category}?${query}`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error(
      `❌ Lỗi khi lấy phim theo thể loại (${category}):`,
      error.response?.data || error.message
    );
    return [];
  }
}

async function fetchCountries() {
  try {
    const url = `${BASE_URL.replace('/v1/api', '')}/quoc-gia`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách quốc gia:', error.response?.data || error.message);
    return [];
  }
}

async function fetchMoviesByCountry(country, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/quoc-gia/${country}?${query}`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error(
      `❌ Lỗi khi lấy phim theo quốc gia (${country}):`,
      error.response?.data || error.message
    );
    return [];
  }
}

async function fetchMoviesByYear(year, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/nam/${year}?${query}`;
    const res = await axios.get(url);
    return res.data.data?.items || res.data.items || [];
  } catch (error) {
    console.error(`❌ Lỗi khi lấy phim theo năm (${year}):`, error.response?.data || error.message);
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
