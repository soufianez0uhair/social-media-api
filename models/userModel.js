const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.statics.signup = async function(fullName, email, password) {
    if(!fullName || !email || !password) {
        throw Error('Please fill in all the fields!');
    }

    const nums = ['0','1','2','3','4','5','6','7','8','9'];

    let i = 0;

    while(nums.indexOf(fullName[i]) === -1 && i < fullName.length) {
        i++;
    }

    if(i < fullName.length) {
        throw Error('Please use a valid name!');
    }

    if(!validator.isEmail(email)) {
        throw Error('Invalid email!');
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Password isn't strong enough!");
    }

    const exists = await this.findOne({email});

    if(exists) {
        throw Error('This email is already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({fullName, email, password: hash});

    return user
}

module.exports = mongoose.model('User', userSchema);