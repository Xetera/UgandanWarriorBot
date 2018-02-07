let mongoose = require('mongoose');
const User = require('./user-model').userTemplate;


let ChatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Server', ChatSchema);