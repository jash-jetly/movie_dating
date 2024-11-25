import axios from 'axios';

const OMDB_API_KEY = 'e0ff9cf9';
const BASE_URL = 'http://www.omdbapi.com';

export const omdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

export const searchMovies = async (query: string, page = 1) => {
  const response = await omdbApi.get('', {
    params: { s: query, page },
  });
  return response.data;
};

export const getMovieDetails = async (imdbId: string) => {
  const response = await omdbApi.get('', {
    params: { i: imdbId, plot: 'full' },
  });
  return response.data;
};