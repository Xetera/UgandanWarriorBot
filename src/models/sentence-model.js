let mongoose = require('mongoose');
const mutes = require('./mute-model');

let SentenceSchema = new mongoose.Schema({
    mutes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Mute'
    }],
    totalMutes: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Sentence', SentenceSchema);