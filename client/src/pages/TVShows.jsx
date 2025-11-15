import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import MovieRow from '../components/MovieRow/MovieRow';
import { getTrending, getPopular, getTopRated } from '../services/tmdb';
import '../styles/TVShows.css';

const TVShows = () => {
  const [trendingShows, setTrendingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [heroShow, setHeroShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        const [trending, popular, topRated] = await Promise.all([
          getTrending('tv', 'week'),
          getPopular('tv'),
          getTopRated('tv'),
        ]);

        setTrendingShows(trending.results);
        setPopularShows(popular.results);
        setTopRatedShows(topRated.results);
        
        // Set first trending show as hero
        if (trending.results && trending.results.length > 0) {
          setHeroShow(trending.results[0]);
        }
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
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
    <div className="tvshows-page">
      <Navbar />
      <HeroSection movie={heroShow} mediaType="tv" />
      
      <div className="tvshows-content">
        <MovieRow
          title="Trending This Week"
          movies={trendingShows}
          mediaType="tv"
          onFavoriteChange={handleFavoriteChange}
        />
        <MovieRow
          title="Popular TV Shows"
          movies={popularShows}
          mediaType="tv"
          onFavoriteChange={handleFavoriteChange}
        />
        <MovieRow
          title="Top Rated"
          movies={topRatedShows}
          mediaType="tv"
          onFavoriteChange={handleFavoriteChange}
        />
      </div>
    </div>
  );
};

export default TVShows;