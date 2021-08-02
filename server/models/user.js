const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aiGamesWon: {
        type: Number,
        default: 0
    },
    register_date: {
        type: Date,
        default: Date.now
    } 
});

const User = mongoose.model('user', UserSchema);

module.exports = User;