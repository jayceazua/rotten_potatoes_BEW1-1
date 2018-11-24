// NEW Comment
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

// CREATE
commentsRouter.post('/reviews/comments', (req, res) => {
    Comment.create(req.body)
    .then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`)
    })
    .catch(e => e)
});

commentsRouter.delete('/reviews/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
        .then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        })
        .catch(e => e)
});

module.exports = commentsRouter
