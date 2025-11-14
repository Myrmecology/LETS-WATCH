const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

// @desc    Get trending movies/TV shows
// @route   GET /api/tmdb/trending/:mediaType/:timeWindow
// @access  Public
router.get('/trending/:mediaType/:timeWindow', async (req, res) => {
  try {
    const { mediaType, timeWindow } = req.params;
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get popular movies or TV shows
// @route   GET /api/tmdb/popular/:mediaType
// @access  Public
router.get('/popular/:mediaType', async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get top rated movies or TV shows
// @route   GET /api/tmdb/top-rated/:mediaType
// @access  Public
router.get('/top-rated/:mediaType', async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/top_rated?api_key=${API_KEY}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Search movies or TV shows
// @route   GET /api/tmdb/search/:mediaType
// @access  Public
router.get('/search/:mediaType', async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get movie or TV show details
// @route   GET /api/tmdb/details/:mediaType/:id
// @access  Public
router.get('/details/:mediaType/:id', async (req, res) => {
  try {
    const { mediaType, id } = req.params;
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get genre list
// @route   GET /api/tmdb/genres/:mediaType
// @access  Public
router.get('/genres/:mediaType', async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Discover movies/TV by genre
// @route   GET /api/tmdb/discover/:mediaType
// @access  Public
router.get('/discover/:mediaType', async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { genre, page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genre}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;