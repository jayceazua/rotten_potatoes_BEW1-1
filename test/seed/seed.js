const Review = require('./../../models/review');

const reviews = [{
  title: 'Is this movie even that good?',
  movieTitle: 'mid90s',
  description: 'I want to watch this movie.',
  rating: 3
}, {
  title: 'Another one?',
  movieTitle: 'Harry Potter',
  description: 'ehhh...',
  rating: 6
}];

const populateReviews = (done) => {
    Review.deleteMany({}).then(() => {
        let reviewOne = new Review(reviews[0]).save();
        let reviewTwo = new Review(reviews[1]).save();
        // Promise all method waits for all promises to resolve.
        return Promise.all([reviewOne, reviewTwo])
    }).then(() => done());
}

module.exports = {
    reviews,
    populateReviews
}
