import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import MovieRow from '../components/MovieRow/MovieRow';
import { getTrending, getPopular, getTopRated } from '../services/tmdb';
import '../styles/Movies.css';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [trending, popular, topRated] = await Promise.all([
          getTrending('movie', 'week'),
          getPopular('movie'),
          getTopRated('movie'),
        ]);

        setTrendingMovies(trending.results);
        setPopularMovies(popular.results);
        setTopRatedMovies(topRated.results);
        
        // Set first trending movie as hero
        if (trending.results && trending.results.length > 0) {
          setHeroMovie(trending.results[0]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [refreshKey]);

  const handleFavoriteChange = () => {
    setRefreshKey(prev => prev + 1);
  };

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
    <div className="movies-page">
      <Navbar />
      <HeroSection movie={heroMovie} mediaType="movie" />
      
      <div className="movies-content">
        <MovieRow
          title="Trending This Week"
          movies={trendingMovies}
          mediaType="movie"
          onFavoriteChange={handleFavoriteChange}
        />
        <MovieRow
          title="Popular Movies"
          movies={popularMovies}
          mediaType="movie"
          onFavoriteChange={handleFavoriteChange}
        />
        <MovieRow
          title="Top Rated"
          movies={topRatedMovies}
          mediaType="movie"
          onFavoriteChange={handleFavoriteChange}
        />
      </div>
    </div>
  );
};

export default Movies;