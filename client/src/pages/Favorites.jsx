import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import MovieCard from '../components/MovieCard/MovieCard';
import { getFavorites } from '../services/tmdb';
import '../styles/Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'movie', 'tv'

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteChange = () => {
    fetchFavorites();
  };

  const filteredFavorites = favorites.filter((fav) => {
    if (filter === 'all') return true;
    return fav.mediaType === filter;
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Navbar />
      
      <div className="favorites-container">
        <h1 className="favorites-title">My Favorites</h1>

        {favorites.length > 0 && (
          <div className="favorites-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({favorites.length})
            </button>
            <button
              className={`filter-btn ${filter === 'movie' ? 'active' : ''}`}
              onClick={() => setFilter('movie')}
            >
              Movies ({favorites.filter(f => f.mediaType === 'movie').length})
            </button>
            <button
              className={`filter-btn ${filter === 'tv' ? 'active' : ''}`}
              onClick={() => setFilter('tv')}
            >
              TV Shows ({favorites.filter(f => f.mediaType === 'tv').length})
            </button>
          </div>
        )}

        {filteredFavorites.length === 0 ? (
          <div className="favorites-empty">
            <h2>No favorites yet</h2>
            <p>Start adding your favorite movies and TV shows!</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {filteredFavorites.map((favorite) => (
              <MovieCard
                key={favorite._id}
                movie={{
                  id: favorite.movieId,
                  title: favorite.title,
                  name: favorite.title,
                  poster_path: favorite.posterPath,
                  overview: favorite.overview,
                  release_date: favorite.releaseDate,
                  first_air_date: favorite.releaseDate,
                  vote_average: favorite.voteAverage,
                }}
                mediaType={favorite.mediaType}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;