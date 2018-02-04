let mongoose = require('mongoose');

let MuteSchema = new mongoose.Schema({
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