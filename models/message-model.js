let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required:true
    },
    is_bot: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Message', MessageSchema);