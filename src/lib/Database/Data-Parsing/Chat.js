const MessageModel = require('../../../models/message-model');

exports.parseUserData = function(from){
    return new MessageModel(from);
};