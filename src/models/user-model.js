let mongoose = require('mongoose');
let Message = require('./message-model').messageTemplate;
let Sentence = require('./sentence-model').sentenceTemplate;

let UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    server_id : {
        type: Number,
        require: false
    },
    server_name: {
        type: String,
        require: true
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
    },
    messageCount: {
        type: Number,
        required: true
    },
    ignoring: { // ignoring all commands from user?
        type: Boolean,
        required: true
    },
    note: {
        type:String,
        required: false
    }
});

module.exports.userTemplate = UserSchema;
module.exports = mongoose.model('User', UserSchema);