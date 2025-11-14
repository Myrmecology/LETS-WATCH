import React from 'react';
import { getImageUrl } from '../../services/tmdb';
import { truncateText, formatRating } from '../../utils/helpers';
import './HeroSection.css';

const HeroSection = ({ movie, mediaType = 'movie' }) => {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const backdropPath = movie.backdrop_path;
  const overview = movie.overview;
  const voteAverage = movie.vote_average;

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: backdropPath
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(20, 20, 20, 0.9)), url(${getImageUrl(backdropPath)})`
          : 'linear-gradient(to bottom, #1a1a1a, #141414)',
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          <span className="hero-rating">⭐ {formatRating(voteAverage)}</span>
          <span className="hero-type">{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
        </div>
        <p className="hero-overview">{truncateText(overview, 300)}</p>
      </div>
    </div>
  );
};

export default HeroSection;