const express = require('express');
const { getPosts, createPost, getPost, updatePost, deletePost, updateReaction } = require('../controllers/postControllers');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
    .use(requireAuth)
    .get('/', getPosts)
    .use('/', upload.single('img'))
    .post('/', createPost)
    .get('/:id', getPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost)
    .patch('/:id/reactions', updateReaction)

module.exports = router