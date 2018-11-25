const router = require('express').Router();
const Review = require('../models/review');
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('b91882fe5794937e9c6d9b8a190cf759');
const Comment = require('../models/comment');

// INDEX - See all reviews
router.get('/', (req, res) => {
    res.redirect('/movies')
});

// NEW - See new review form
router.get('/movies/:movieId/reviews/new', (req, res) => {
    moviedb.movieInfo({ id: req.params.movieId }).then((movie) => {
        res.render('reviews/new', {movie})
    }).catch(e => res.send(e.message));
});

// CREATE - Create a new review
router.post('/movies/:movieId/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    res.redirect(`/movies/${req.params.movieId}`) // Redirect to reviews/:id
  }).catch((err) => {
    res.send(err.message);
  });
});

// SHOW - See one review
router.get('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
      Comment.find({reviewId: req.params.id}).then((comments) => {
        res.render('reviews/show', {review, comments})
      })
  }).catch((err) => {
    res.send(err.message)
  });
});

// EDIT - See an edit review form
router.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
    moviedb.movieInfo({ id: req.params.movieId}).then((movie) => {
        Review.findById(req.params.id).then((review) => {
          res.render('reviews/edit', {review, movie})
        }).catch((err) => {
          res.send(err.message)
        })
    }).catch(e => res.send(e.message));
;
});

// UPDATE - Update a review
router.patch('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
    res.redirect(`/movies/${req.params.movieId}`)
  }).catch((err) => {
    res.send(err.message)
  })
});

// DELETE - Delete a review
router.delete('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findByIdAndRemove(req.params.id).then(() => {
    res.redirect(`/movies/${req.params.movieId}`);
  }).catch((err) => {
    res.send(err.message)
  })
});

module.exports = router
