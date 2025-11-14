const Favorite = require('../models/Favorite');

// @desc    Get all favorites for a user
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a favorite
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res) => {
  try {
    const { movieId, title, posterPath, overview, releaseDate, voteAverage, mediaType } = req.body;

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      movieId,
      mediaType,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    // Create favorite
    const favorite = await Favorite.create({
      user: req.user._id,
      movieId,
      title,
      posterPath,
      overview,
      releaseDate,
      voteAverage,
      mediaType,
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a favorite
// @route   DELETE /api/favorites/:id
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // Check if favorite belongs to user
    if (favorite.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Favorite.deleteOne({ _id: req.params.id });

    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if item is favorited
// @route   GET /api/favorites/check/:movieId/:mediaType
// @access  Private
const checkFavorite = async (req, res) => {
  try {
    const { movieId, mediaType } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user._id,
      movieId: parseInt(movieId),
      mediaType,
    });

    res.json({ isFavorited: !!favorite, favoriteId: favorite?._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
};