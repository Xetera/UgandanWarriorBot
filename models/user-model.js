let mongoose = require('mongoose');
const mutes = require('./mute-model');

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
    messageCount: {
        type:Number,
        required: false
    },
    sentences: {
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Sentence'
        },
        required: false
    },
    ignoring: { // ignoring all commands from user?
        type: Boolean,
        required: false
    },
    note: {
        type:String,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);