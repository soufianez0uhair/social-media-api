const express = require('express');
const { signUpUser } = require('../controllers/userControllers');

const router = express.Router();

router
    .post('/signup', signUpUser)

module.exports = router