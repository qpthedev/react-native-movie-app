import axios from "axios";

const DB_KEY = "3cc9bca758f329777e9b4b3e26409005";

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: DB_KEY,
    },
  });

const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results },
      data,
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (error) {
    return [null, error];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything(`/movie/now_playing`),
  popular: () => getAnything(`/movie/popular`),
  upcoming: () => getAnything(`/movie/upcoming`, { region: "us" }),
  search: (query) =>
    getAnything(`/search/movie`, { query, include_adult: true }),
  movie: (id) => getAnything(`/movie/${id}`, { append_to_response: "videos" }),
  discover: () => getAnything(`/discover/movie`, { include_adult: true }),
};

export const tvApi = {
  today: () => getAnything(`/tv/airing_today`),
  thisWeek: () => getAnything(`/tv/on_the_air`),
  topRated: () => getAnything(`/tv/top_rated`),
  popular: () => getAnything(`/tv/popular`),
  search: (query) => getAnything(`/search/tv`, { query, include_adult: true }),
  show: (id) => getAnything(`/tv/${id}`, { append_to_response: "videos" }),
};

export const apiImage = (path) => `https://image.tmdb.org/t/p/w500${path}`;
