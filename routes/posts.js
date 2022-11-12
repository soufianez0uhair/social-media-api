const express = require('express');
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/postControllers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router
    .use(requireAuth)
    .get('/', getPosts)
    .post('/', createPost)
    .get('/:id', getPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost)

module.exports = router