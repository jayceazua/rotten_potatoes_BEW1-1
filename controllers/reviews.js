const router = require('express').Router();
const Review = require('../models/review');

// INDEX - See all reviews
router.get('/', (req, res) => {
  Review.find({}).then((reviewsData) => {
    res.render('reviews/index', {reviewsData});
  }).catch((err) => {
      res.send(err.message);
  });
});

// NEW - See new review form
router.get('/reviews/new', (req, res) => {
  res.render('reviews/new')
});

// CREATE - Create a new review
router.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message);
  });
});

// SHOW - See one review
router.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews/show', {review})
  }).catch((err) => {
    res.send(err.message)
  });
});

// EDIT - See an edit review form
router.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews/edit', {review});
  }).catch((err) => {
    res.send(err.message)
  });
});

// UPDATE - Update a review
router.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
  .then((review) => {
    res.redirect(`/reviews/${review._id}`)
  }).catch((err) => {
    res.send(err.message)
  })
});

// DELETE - Delete a review
router.delete('/reviews/:id', (req, res) => {
  Review.findByIdAndRemove(req.params.id)
  .then((review) => {
    res.redirect('/');
  }).catch((err) => {
    res.send(err.message)
  })
});

module.exports = router
