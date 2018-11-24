const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    reviewId: {
        type: Schema.Types.ObjectId, 
        ref: 'Review' }
});

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
