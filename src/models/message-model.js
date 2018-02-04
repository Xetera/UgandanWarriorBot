let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    date: {
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
    },
    text: {
        type:String,
        required: true
    }

});
module.exports.messageTemplate = MessageSchema;
module.exports = mongoose.model('Message', MessageSchema);

