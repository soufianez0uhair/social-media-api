const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: String,
    img: {
        data: Buffer,
        contentType: String
    },
    likes: {
        likes: 0,
        loves: 0,
        wows: 0,
        haha: 0
    },
    comments: [],
    shares: [],
    userId: String
})

module.exports = mongoose.model('Post', postSchema);