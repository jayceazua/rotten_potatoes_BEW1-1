// NEW Comment
const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

// CREATE
commentsRouter.post('/movies/:movieId/reviews/comments', (req, res) => {
    Comment.create(req.body)
    .then((comment) => {
        res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`)
    })
    .catch(e => res.send(e.message))
});

commentsRouter.delete('/reviews/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then(() => {
            res.redirect(`/movies`);
        })
        .catch(e => res.send(e.message))
});

module.exports = commentsRouter
