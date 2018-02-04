const mongoos = require('mongoose');
const userSchema = require('../../src/models/user-model');
const serverSchema = require('../../src/models/server-model');
const debug = require('../../Development/Debug').debug;

exports.findUser = function(id){
    return new Promise(function(resolve, reject){
        userSchema.find({id: id}).then(doc => {
            resolve(doc);
        }).catch(err => {
            debug.error(err);
            reject(err);
        })
    });
};

exports.findUserInServer = function(userID, server){
    console.log(server);
    return new Promise(function(resolve, reject){
        serverSchema.find({id: server.id, "users.id": userID}).then(doc => {
            resolve(doc);
            console.log(doc);
        });
    })
};

exports.findServer = function(id){
    return new Promise(function(resolve, reject){
        serverSchema.find({id: id}).then(doc => {
            console.log(doc);
            resolve(doc);
        }).catch(err => {
            reject(err);
        })
    })
}