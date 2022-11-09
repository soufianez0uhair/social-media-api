const express = require('express');
const { signUpUser, logInUser } = require('../controllers/userControllers');

const router = express.Router();

router
    .post('/signup', signUpUser)
    .post('/login', logInUser)

module.exports = router