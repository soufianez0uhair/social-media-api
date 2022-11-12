const Post = require('../models/postModel');
const mongoose = require('mongoose');

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

const getPost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid id'
                  })
    }

    const post = await Post.findById(id);

    if(!post) {
        return res
                  .status(400)
                  .json({
                    message: 'No such post was found!'
                  })
    }

    return res
              .status(200)
              .json({
                post
              })
}

module.exports = {getPosts, createPost, getPost}