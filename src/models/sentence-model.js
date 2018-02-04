let mongoose = require('mongoose');
const mutes = require('./mute-model').muteTemplate;

let SentenceSchema = new mongoose.Schema({
    mutes: {
        type: [mutes],
        required: false
    },
    totalMutes: {
        type: Number,
        required: false
    }
});

module.exports.sentenceTemplate = SentenceSchema;
module.exports = mongoose.model('Sentence', SentenceSchema);