import axios from 'axios';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};