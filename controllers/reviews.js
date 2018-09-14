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
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  });
});
// SHOW - See one review
router.get('/:id', (req, res) => {

});
// EDIT - See an edit review form
router.get('/:id/edit', (req, res) => {

});
// UPDATE - Update a review
router.put('/:id', (req, res) => {

});
// DELETE - Delete a review
router.get('/:id', (req, res) => {

});


module.exports = router
