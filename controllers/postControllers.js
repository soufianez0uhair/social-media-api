const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1});

    if(!posts) {
        return res
                  .status(400)
                  .json({
                    message: 'No post was found!'
                  })
    }

    res
        .status(200)
        .json({
            posts
        })
}

const createPost = async (req, res) => {
    const {text, img, likes, comments, shares, userId} = req.body;

    try {
        const post = await Post.create({text, img, likes, comments, shares, userId});

        return res
                  .status(200)
                  .json({
                    post
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    message: err.message
                  })
    }
}

module.exports = {getPosts, createPost}