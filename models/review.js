const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({
  title: String
});

let Review = mongoose.model('Review', ReviewSchema);

module.exports = Review
