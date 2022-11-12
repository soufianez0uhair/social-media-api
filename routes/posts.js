const express = require('express');
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/postControllers');

const router = express.Router();

router
    .get('/', getPosts)
    .post('/', createPost)
    .get('/:id', getPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost)

module.exports = router