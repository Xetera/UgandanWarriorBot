const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');

exports.createServer = function(from){
    console.log(from);
    return new serverModel({
        id: from.id,
        name: from.title,
        type: from.type
    })
};

exports.createUser = function(from){
    console.log(from);
    return new userModel({
        id: from.id,
        first_name: from.first_name,
        is_bot: from.is_bot,
    })
};