let mongoose = require('mongoose');
let Message = require('./message-model').messageTemplate;
let Sentence = require('./sentence-model').sentenceTemplate;

let UserSchema = new mongoose.Schema({
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
    },
    messages: {
        type: [Message],
        required: false
    },
    messageCount: {
        type: Number,
        required: true
    },
    sentences: {
        type: [Sentence],
        required: false
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