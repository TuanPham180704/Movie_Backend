const axios = require('axios');
const BASE_URL = 'https://phimapi.com';

// 1️⃣ Danh sách phim mới cập nhật
const getNewMovies = async ({ page = 1, version = 'v1' }) => {
  const path =
    version === 'v2'
      ? `/danh-sach/phim-moi-cap-nhat-v2?page=${page}`
      : version === 'v3'
        ? `/danh-sach/phim-moi-cap-nhat-v3?page=${page}`
        : `/danh-sach/phim-moi-cap-nhat?page=${page}`;
  const { data } = await axios.get(`${BASE_URL}${path}`);
  return data;
};

// 2️⃣ Thông tin phim
const getMovieDetail = async (slug) => {
  const { data } = await axios.get(`${BASE_URL}/phim/${slug}`);
  return data;
};

// 3️⃣ TMDB
const getByTMDB = async (type, id) => {
  const { data } = await axios.get(`${BASE_URL}/tmdb/${type}/${id}`);
  return data;
};

// 4️⃣ Danh sách tổng hợp
const getMovieList = async (type_list, params) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${BASE_URL}/v1/api/danh-sach/${type_list}?${query}`);
  return data;
};

// 5️⃣ Tìm kiếm
const searchMovies = async (query) => {
  const q = query.q || '';
  if (!q) return [];
  const { data } = await axios.get(`${BASE_URL}/tim-kiem?q=${encodeURIComponent(q)}`);
  if (data?.root?.status) return data.root.movie || [];
  return [];
};

// 6️⃣ Thể loại
const getGenres = async () => {
  const { data } = await axios.get(`${BASE_URL}/the-loai`);
  return data; // trả full list
};
const getCountries = async () => {
  const { data } = await axios.get(`${BASE_URL}/quoc-gia`);
  return data; // trả full list
};
const getGenreDetail = async (type_list, params) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${BASE_URL}/v1/api/the-loai/${type_list}?${query}`);
  return data;
};



const getCountryDetail = async (type_list, params) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${BASE_URL}/v1/api/quoc-gia/${type_list}?${query}`);
  return data;
};

// 8️⃣ Năm
const getMoviesByYear = async (type_list, params) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${BASE_URL}/v1/api/nam/${type_list}?${query}`);
  return data;
};

module.exports = {
  getNewMovies,
  getMovieDetail,
  getByTMDB,
  getMovieList,
  searchMovies,
  getGenres,
  getGenreDetail,
  getCountries,
  getCountryDetail,
  getMoviesByYear,
};
