require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res
                  .status(400)
                  .json({
                    message: 'Authorization is required!'
                  })
    }

    const token = authorization.split(' ')[1];

    const {_id} = jwt.verify(token, process.env.SECRET);

    req.userId = _id;

    next();
}

module.exports = requireAuth