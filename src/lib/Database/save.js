const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');
const find = require('./find');
/**
 *
 * @param {mongoose.Model} user
 */
exports.saveUserInServer = function(user, server) {
    server.update({id: server.id, "users.id": user.id}).then((err)=>{
        if (err) console.log(err);
        console.log("updarted user!!!")
    })
};

exports.saveNewUserInServer = function(user, server){
    server.update({id: server.id}, {$push: {users: user}}).then(err => {
        if (err) return console.log(err);
        console.log('Added new user successfully.');
    })
};

exports.saveServer = function(server) {
    server.save().then(()=>{
        debug.info('Saved!');
    })
};

exports.updateUserNote = function(server, user, note){
    let options = {upsert: true};
    server.update({'users.id':user.id}, {note: note}, options).then(err => {
        if (!err){
            debug.info(`Note for user ${user.username} was updated.`);
        }
    })
};