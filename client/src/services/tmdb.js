import api from './api';

const TMDB_IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p/original';

// Get trending movies/TV shows
export const getTrending = async (mediaType = 'all', timeWindow = 'week') => {
  const response = await api.get(`/api/tmdb/trending/${mediaType}/${timeWindow}`);
  return response.data;
};

// Get popular movies or TV shows
export const getPopular = async (mediaType = 'movie', page = 1) => {
  const response = await api.get(`/api/tmdb/popular/${mediaType}?page=${page}`);
  return response.data;
};

// Get top rated movies or TV shows
export const getTopRated = async (mediaType = 'movie', page = 1) => {
  const response = await api.get(`/api/tmdb/top-rated/${mediaType}?page=${page}`);
  return response.data;
};

// Search movies or TV shows
export const searchMedia = async (mediaType = 'movie', query, page = 1) => {
  const response = await api.get(`/api/tmdb/search/${mediaType}?query=${encodeURIComponent(query)}&page=${page}`);
  return response.data;
};

// Get movie or TV show details
export const getMediaDetails = async (mediaType, id) => {
  const response = await api.get(`/api/tmdb/details/${mediaType}/${id}`);
  return response.data;
};

// Get genres
export const getGenres = async (mediaType = 'movie') => {
  const response = await api.get(`/api/tmdb/genres/${mediaType}`);
  return response.data;
};

// Discover by genre
export const discoverByGenre = async (mediaType = 'movie', genreId, page = 1) => {
  const response = await api.get(`/api/tmdb/discover/${mediaType}?genre=${genreId}&page=${page}`);
  return response.data;
};

// Get favorites
export const getFavorites = async () => {
  const response = await api.get('/api/favorites');
  return response.data;
};

// Add to favorites
export const addToFavorites = async (movieData) => {
  const response = await api.post('/api/favorites', movieData);
  return response.data;
};

// Remove from favorites
export const removeFromFavorites = async (favoriteId) => {
  const response = await api.delete(`/api/favorites/${favoriteId}`);
  return response.data;
};

// Check if favorited
export const checkFavorite = async (movieId, mediaType) => {
  const response = await api.get(`/api/favorites/check/${movieId}/${mediaType}`);
  return response.data;
};

// Helper function to get full image URL
export const getImageUrl = (path, size = 'original') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};