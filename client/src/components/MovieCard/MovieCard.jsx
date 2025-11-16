import React, { useState, useEffect } from 'react';
import { getImageUrl, addToFavorites, removeFromFavorites, checkFavorite } from '../../services/tmdb';
import { useAuth } from '../../context/AuthContext';
import { formatRating } from '../../utils/helpers';
import MovieModal from '../MovieModal/MovieModal';
import './MovieCard.css';

const MovieCard = ({ movie, mediaType = 'movie', onFavoriteChange }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const movieId = movie.id;
  const title = movie.title || movie.name;
  const posterPath = movie.poster_path;
  const voteAverage = movie.vote_average;
  const releaseDate = movie.release_date || movie.first_air_date;

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (isAuthenticated && movieId) {
        try {
          const result = await checkFavorite(movieId, mediaType);
          setIsFavorited(result.isFavorited);
          setFavoriteId(result.favoriteId);
        } catch (error) {
          console.error('Error checking favorite:', error);
        }
      }
    };

    checkIfFavorited();
  }, [isAuthenticated, movieId, mediaType]);

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please log in to add favorites');
      return;
    }

    setLoading(true);

    try {
      if (isFavorited) {
        await removeFromFavorites(favoriteId);
        setIsFavorited(false);
        setFavoriteId(null);
      } else {
        const favoriteData = {
          movieId,
          title,
          posterPath,
          overview: movie.overview,
          releaseDate,
          voteAverage,
          mediaType,
        };
        const result = await addToFavorites(favoriteData);
        setIsFavorited(true);
        setFavoriteId(result._id);
      }

      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert(error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="movie-card" onClick={handleCardClick}>
        <div className="movie-card-image-wrapper">
          <img
            src={posterPath ? getImageUrl(posterPath) : '/placeholder.png'}
            alt={title}
            className="movie-card-image"
          />
          <div className="movie-card-overlay">
            <h3 className="movie-card-title">{title}</h3>
            <p className="movie-card-rating">⭐ {formatRating(voteAverage)}</p>
            {isAuthenticated && (
              <button
                onClick={handleFavoriteToggle}
                className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                disabled={loading}
              >
                {loading ? '...' : isFavorited ? '❤️' : '🤍'}
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <MovieModal
          movieId={movieId}
          mediaType={mediaType}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MovieCard;