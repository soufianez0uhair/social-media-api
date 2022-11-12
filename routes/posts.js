const express = require('express');
const { getPosts, createPost } = require('../controllers/postControllers');

const router = express.Router();

router
    .get('/', getPosts)
    .post('/', createPost)

module.exports = router