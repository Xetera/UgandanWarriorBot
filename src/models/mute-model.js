let mongoose = require('mongoose');

let MuteSchema = new mongoose.Schema({
    user : {
        type:Number,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
});
module.exports.muteTemplate = MuteSchema;
module.exports = mongoose.model('Mute', MuteSchema);