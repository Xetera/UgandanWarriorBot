const MessageModel = require('../../../src/models/message-model');

exports.parseUserData = function(from){
    return new MessageModel(from);
};