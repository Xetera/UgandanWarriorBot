const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');
const find = require('./find');
const debug = require('../../Development/Debug');


const saveUserInServer = function(user) {
    return new Promise(function(resolve, reject){

        user.save().then((err)=> {
            console.log(err);
            resolve();
        })
    })
};


const saveServer = function(server) {
    return new Promise(function (resolve, reject){
        server.save().then(()=>{
            resolve();
        });
    });
};

const saveMessage = function(message){
    return new Promise(function(resolve, reject){
        message.save().then(response => {
            resolve();
        });
    });
};

const updateUserNote = function(user, note){
    let options = {upsert: true};
    userModel.update({_id: user._id},{note: note}, options).then(err => {
        if (!err){
            debug.info(`Note for user ${user.username} was updated.`);
        }
    })
};

const incrementMessageCount = function(user, server){

    userModel.update({id: user.id, server_id: server.id}, {$inc: {messageCount: 1}}).then(response => {
        console.log(response);
    });
};

const saveUserMessage = function(user, message) {
    userModel.findOne({_id: user._id}).then((err, doc )=> {
        if (err) console.log(err);

    });
};
module.exports = {
    saveUserMessage: saveUserMessage,
    incrementMessageCount: incrementMessageCount,
    updateUserNote: updateUserNote,
    saveMessage: saveMessage,
    saveServer: saveServer,
    saveUserInServer: saveUserInServer
};