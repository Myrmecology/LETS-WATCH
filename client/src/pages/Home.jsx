import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrending } from '../services/tmdb';
import { getImageUrl } from '../services/tmdb';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrending('movie', 'week');
        setMovies(data.results.slice(0, 100));
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();

    // Generate floating particles
    const generatedParticles = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15,
      animationDelay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  const handleEnter = () => {
    navigate('/menu');
  };

  return (
    <div className="home-page">
      {/* Animated gradient background */}
      <div className="animated-gradient"></div>

      {/* Floating particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Movie grid background */}
      <div className="movie-grid-background">
        {movies.map((movie, index) => (
          <div
            key={movie.id || index}
            className="grid-movie-poster"
            style={{
              backgroundImage: movie.poster_path
                ? `url(${getImageUrl(movie.poster_path)})`
                : 'linear-gradient(#333, #555)',
              animationDelay: `${(index % 20) * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Main overlay with button */}
      <div className="home-overlay">
        <div className="title-container">
          <h1 className="welcome-text">Welcome to</h1>
          <button className="lets-watch-btn" onClick={handleEnter}>
            <div className="btn-glow"></div>
            <div className="btn-shine"></div>
            <span className="lets-watch-text-top">LETS</span>
            <span className="lets-watch-text-bottom">WATCH</span>
          </button>
          <p className="subtitle-text">Your Ultimate Streaming Experience</p>
        </div>
      </div>
    </div>
  );
};

export default Home;