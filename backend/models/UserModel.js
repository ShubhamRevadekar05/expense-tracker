const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)