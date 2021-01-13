const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema(
  {
    point: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    message: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
    },
  },
  { timestamps: true }
);

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    images: [String],
    imageUrl: String,
    releaseDate: {
      type: Date,
    },
    duration: String,
    genre: [String],
    trailerLink: String,
    tags: [String],
    castCrew: [String],
    directors: [String],
    awards: [String],
    songs: [String],
    ratings: [RatingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('movie', MovieSchema);
