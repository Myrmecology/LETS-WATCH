import React, { useState, useEffect } from 'react';
import { getMediaDetails } from '../../services/tmdb';
import { formatDate, formatRating, formatRuntime } from '../../utils/helpers';
import { getImageUrl } from '../../services/tmdb';
import './MovieModal.css';

const MovieModal = ({ movieId, mediaType, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMediaDetails(mediaType, movieId);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, mediaType]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const trailer = details.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div
          className="modal-backdrop"
          style={{
            backgroundImage: details.backdrop_path
              ? `url(${getImageUrl(details.backdrop_path)})`
              : 'linear-gradient(#333, #555)',
          }}
        >
          <div className="modal-backdrop-overlay"></div>
        </div>

        <div className="modal-body">
          <h1 className="modal-title">{title}</h1>

          <div className="modal-meta">
            <span className="modal-rating">⭐ {formatRating(details.vote_average)}</span>
            <span className="modal-date">{formatDate(releaseDate)}</span>
            {details.runtime && (
              <span className="modal-runtime">{formatRuntime(details.runtime)}</span>
            )}
          </div>

          <p className="modal-overview">{details.overview}</p>

          {details.genres && details.genres.length > 0 && (
            <div className="modal-genres">
              {details.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {trailer && (
            <div className="modal-trailer">
              <h2 className="trailer-title">Trailer</h2>
              <div className="trailer-wrapper">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;