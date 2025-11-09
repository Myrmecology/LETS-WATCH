const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
    },
    overview: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    voteAverage: {
      type: Number,
    },
    mediaType: {
      type: String,
      enum: ['movie', 'tv'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can't favorite the same item twice
FavoriteSchema.index({ user: 1, movieId: 1, mediaType: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);