let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date : {
        type: Date,
        required: true
    },
    first_name: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Message', MessageSchema);

