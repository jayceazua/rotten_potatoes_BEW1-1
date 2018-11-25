// controllers/admin.js
const adminRouter = require('express').Router()
const Review = require('../models/review')

// NEW Comment
adminRouter.get('/admin', (req, res) => {
Review.find()
  .then((reviews) => {
      res.render('admin', { reviews });
  })
  .catch((e) => {
    res.send(e.message)
  });
});

module.exports = adminRouter
