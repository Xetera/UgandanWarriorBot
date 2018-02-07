const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');
const messageModel = require('../../models/message-model');
const debug = require('../../Development/Debug');


exports.createMessage = function(ctx){
    let message = ctx.update.message;
    let model =  new messageModel({
        id:         message.message_id,
        date:       message.date,
        first_name: ctx.from.first_name,
        username:   ctx.from.username,
        text:       message.text
    });
    debug.info('Created new Message');
    return model;
};


exports.createServer = function(from){
    let model = new serverModel({
        id: from.id,
        name: from.title,
        type: from.type,
    });
    debug.info('Created new Server');
    return model;
};


exports.createUser = function(ctx){
    let from = ctx.from;
    let model =  new userModel({
        id: from.id,
        username: from.username,
        first_name: from.first_name,
        is_bot: from.is_bot,
        server_id: ctx.chat.id,
        server_name: ctx.chat.first_name,
        ignoring: false,
        messageCount: 0
    });
    debug.info("Created new User");
    return model;
};