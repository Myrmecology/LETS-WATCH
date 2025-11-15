import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import MovieCard from '../components/MovieCard/MovieCard';
import { searchMedia } from '../services/tmdb';
import '../styles/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState('movie');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await searchMedia(mediaType, query);
      setResults(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="search-page">
      <Navbar />
      
      <div className="search-container">
        <h1 className="search-title">Search</h1>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search for movies or TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </div>

          <div className="search-filters">
            <label className="filter-label">
              <input
                type="radio"
                name="mediaType"
                value="movie"
                checked={mediaType === 'movie'}
                onChange={(e) => setMediaType(e.target.value)}
              />
              <span>Movies</span>
            </label>
            <label className="filter-label">
              <input
                type="radio"
                name="mediaType"
                value="tv"
                checked={mediaType === 'tv'}
                onChange={(e) => setMediaType(e.target.value)}
              />
              <span>TV Shows</span>
            </label>
          </div>
        </form>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="no-results">
            <h3>No results found for "{query}"</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search-results">
            <h2 className="results-title">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </h2>
            <div className="results-grid">
              {results.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  mediaType={mediaType}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          </div>
        )}

        {!searched && !loading && (
          <div className="search-empty-state">
            <p>Enter a search term to find movies or TV shows</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;