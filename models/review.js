const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment')

const ReviewSchema = new Schema ({
  title: {
      type: String,
      required: true
  },
  movieTitle: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  movieId: {
      type: String,
      required: true
  }
});

let Review = mongoose.model('Review', ReviewSchema);

module.exports = Review
