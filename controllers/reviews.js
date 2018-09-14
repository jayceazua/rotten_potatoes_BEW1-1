const router = require('express').Router();

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" }
]


// INDEX - See all reviews
// REVIEW: server.js file

// NEW - See new review form
router.get('/new', (req, res) => {

});
// CREATE - Create a new review
router.post('', (req, res) => {

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
