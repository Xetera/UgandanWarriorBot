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
    messages: {
        type:Number,
        required: false
    },
    mutes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Mute'
        }],
        required: false
    },
    ignoring: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);