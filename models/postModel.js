const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: String,
    img: {
        data: Buffer,
        contentType: String
    },
    likes: {
        likes: Array,
        loves: Array,
        wows: Array,
        haha: Array
    },
    comments: [],
    shares: [],
    userId: String
})

module.exports = mongoose.model('Post', postSchema);