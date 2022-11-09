require('dotenv').config();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "7d"});
}

const signUpUser = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        const user = await User.signup(fullName, email, password);

        return res
                  .status(200)
                  .json({
                    _id: user._id,
                    fullName,
                    email,
                    token: createToken(user._id)
                  })
    } catch(err) {
      return res
                .status(400)
                .json({
                  message: err.message
                })
    }
}

const logInUser = async (req, res) => {

}

module.exports = {signUpUser}