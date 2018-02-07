const mongoose = require('mongoose');
const userSchema = require('../../models/user-model');
const serverSchema = require('../../models/server-model');
const debug = require('../../Development/Debug');

exports.findUser = function(userID, server){
    return new Promise(function(resolve, reject){
        console.log('findserver USERID');
        console.log(server);
        userSchema.find({id: userID, server_id:server.id}).then(user=> {
            console.log(user);
            resolve(user);
        });
    })
};

exports.findServer = function(id){
    return new Promise(function(resolve, reject){

        serverSchema.find({id: id}).then(doc => {
            resolve(doc);
        }).catch(err => {
            reject(err);
        })
    })
}