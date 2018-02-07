let mongoose = require('mongoose');
const mutes = require('./mute-model').muteTemplate;

let SentenceSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: true
    },
    totalMutes: {
        type: Number,
        required: false
    }
});

module.exports.sentenceTemplate = SentenceSchema;
module.exports = mongoose.model('Sentence', SentenceSchema);