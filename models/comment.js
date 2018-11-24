const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    
});

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
