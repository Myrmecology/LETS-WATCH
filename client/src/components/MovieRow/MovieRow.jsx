import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, mediaType = 'movie', onFavoriteChange }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-wrapper">
        <button
          className="movie-row-scroll-btn left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div className="movie-row-container" ref={rowRef}>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movie-row-item">
                <MovieCard
                  movie={movie}
                  mediaType={mediaType}
                  onFavoriteChange={onFavoriteChange}
                />
              </div>
            ))
          ) : (
            <p className="movie-row-empty">No content available</p>
          )}
        </div>
        <button
          className="movie-row-scroll-btn right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieRow;