const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require('../controllers/favoritesController');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)
router.get('/', protect, getFavorites);
router.post('/', protect, addFavorite);
router.delete('/:id', protect, removeFavorite);
router.get('/check/:movieId/:mediaType', protect, checkFavorite);

module.exports = router;