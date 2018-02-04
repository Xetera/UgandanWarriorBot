const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');
const messageModel = require('../../models/message-model');
exports.createMessage = function(from){
  return new messageModel({
      id: from.id,
      date: new Date(),
      first_name: from.first_name,
      username: from.username
  })
};

exports.createServer = function(from){
    console.log(from);
    let server = serverModel({
        id: from.id,
        name: from.title,
        type: from.type,
        users: []
    });
    server.users  = [];
    return server;
};

exports.createUser = function(from){
    console.log(from);
    return new userModel({
        id: from.id,
        first_name: from.first_name,
        is_bot: from.is_bot,
    })
};