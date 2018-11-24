// NEW Comment
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

commentsRouter.post('/reviews/comments', (req, res) => {
    res.send('Posted Successfully!');
});

module.exports = commentsRouter
