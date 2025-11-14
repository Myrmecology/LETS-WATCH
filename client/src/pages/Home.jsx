import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrending } from '../services/tmdb';
import { getImageUrl } from '../services/tmdb';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrending('movie', 'week');
        setMovies(data.results.slice(0, 100)); // Get first 100 movies for the grid
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleEnter = () => {
    navigate('/menu');
  };

  return (
    <div className="home-page">
      <div className="movie-grid-background">
        {movies.map((movie, index) => (
          <div
            key={movie.id || index}
            className="grid-movie-poster"
            style={{
              backgroundImage: movie.poster_path
                ? `url(${getImageUrl(movie.poster_path)})`
                : 'linear-gradient(#333, #555)',
            }}
          />
        ))}
      </div>
      <div className="home-overlay">
        <button className="lets-watch-btn" onClick={handleEnter}>
          <span className="lets-watch-text-top">LETS</span>
          <span className="lets-watch-text-bottom">WATCH</span>
        </button>
      </div>
    </div>
  );
};

export default Home;