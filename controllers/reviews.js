const router = require('express').Router();
const Review = require('../models/review');

// INDEX - See all reviews
// REVIEW: server.js file

// NEW - See new review form
router.get('/new', (req, res) => {
  res.render('reviews/new', {})
});
// CREATE - Create a new review
router.post('', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  });
});
// SHOW - See one review
router.get('/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews/show', {review})
  }).catch((err) => {
    res.send(err.message)
  });
});
// EDIT - See an edit review form
router.get('/:id/edit', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews/edit', {review});
  }).catch((err) => {
    res.send(err.message)
  });
});
// UPDATE - Update a review
router.put('/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
  .then((review) => {
    res.redirect(`/reviews/${review._id}`)
  }).catch((err) => {
    res.send(err.message)
  })
});
// DELETE - Delete a review
router.get('/:id', (req, res) => {

});


module.exports = router
