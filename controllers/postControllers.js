const Post = require('../models/postModel');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { post } = require('../routes/posts');

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
    const {text} = req.body;

    const likes = {
        likes: [],
        loves: [],
        wows: [],
        haha: []
    }

    const comments = [];
    const shares = [];

    let img = {}

    console.log(req.body, req.file);

    if(req.file && req.file.mimetype.split('/')[0] === 'image') {
        img = {
            data: fs.readFileSync(path.join(__dirname, '..', 'images', req.file.filename)),
            contentType: `image/${path.extname(req.file.originalname).slice(1)}`
        }
    }

    try {
        const post = await Post.create({text, img, likes, comments, shares, userId: req.userId});

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

    const post = await Post.findOne({_id: id, userId: req.userId});

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

const updatePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid id'
                  })
    }

    const post = await Post.findOneAndUpdate({_id: id, userId: req.userId}, {...req.body}, {new: true});

    if(!post) {
        return res
                  .status(400)
                  .json({
                    message: 'No such post was found!'
                  })
    }

    res
        .status(200)
        .json({
            post
        })
}

const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res
                  .status(400)
                  .json({
                    message: 'Invalid Id'
                  })
    }

    const post = await Post.findOneAndDelete({_id: id, userId: req.userId});

    if(!post) {
        return res
                  .status(400)
                  .json({
                    message: 'No such post was found!'
                  })
    }

    res
        .status(200)
        .json({
            post
        })
}

const updateReaction = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res
              .status(400)
              .json({
                message: 'Invalid Id'
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

  const {reaction} = req.body;

  if(!post.likes[reaction]) {
    return res
              .status(400)
              .json({
                message: 'Reaction does not exist!'
              })
  }

  const reactionNames = ['likes', 'loves', 'wows', 'haha'];

  let i = 0;

  while((post.likes[reactionNames[i]] && post.likes[reactionNames[i]].indexOf(req.userId) === -1) && i < reactionNames.length) {
    i++;
  }

  if(i < reactionNames.length) {
    if(reactionNames[i] === reaction) {
      const reactionArr = post.likes[reaction].filter(react => react !== req.userId);

      const updatedPost = await Post.findOneAndUpdate({_id: id}, {likes: {...post.likes, [reaction]: reactionArr}}, {new: true});

      return res
                .status(200)
                .json({
                  updatedPost
                })
    } else {
      const oldReactionArr = post.likes[reactionNames[i]].filter(react => react !== req.userId);

      const newReactionArr = [...post.likes[reaction]];
      newReactionArr.push(req.userId);

      const updatedPost = await Post.findOneAndUpdate({_id: id}, {likes: {...post.likes, [reactionNames[i]]: oldReactionArr, [reaction]: newReactionArr}});

      return res
                .status(200)
                .json({
                  updatedPost
                })
    }
  } else {
    const userId = req.userId;
    const reactionArr = [...post.likes[reaction]];

    reactionArr.push(userId);

    const updatedPost = await Post.findOneAndUpdate({_id: id}, {likes: {...post.likes, [reaction]: reactionArr}}, {new: true});

    return res
              .status(200)
              .json({
                updatedPost
              })
  }
}

module.exports = {getPosts, createPost, getPost, updatePost, deletePost, updateReaction}