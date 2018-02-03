let mongoose = require('mongoose');
const User = require('user-model');

let ChatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    users: {
        type: [User],
        required: false // in case our chat is PM -> no users
    },

});

module.exports = mongoose.model('Chat', ChatSchema);