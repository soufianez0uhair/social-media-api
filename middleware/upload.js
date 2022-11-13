const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, 'Image--' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});

module.exports = upload;