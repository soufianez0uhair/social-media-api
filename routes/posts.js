const express = require('express');
const { getPosts, createPost, getPost } = require('../controllers/postControllers');

const router = express.Router();

router
    .get('/', getPosts)
    .post('/', createPost)
    .get('/:id', getPost)
    
module.exports = router