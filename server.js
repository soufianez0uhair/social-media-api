require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/api/users', require(path.join(__dirname, 'routes', 'users')));

app.use('/api/posts', require(path.join(__dirname, 'routes', 'posts')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(err => console.log(err.message));