const mongoos = require('mongoose');
const userSchema = require('../../models/user-model');
const serverSchema = require('../../models/server-model');
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

exports.findUserInServer = function(id){
    return new Promise(function(resolve, reject){
        serverSchema.find({"users":{id: id}}).then(doc => {
            resolve(doc);
            console.log(doc);
        })
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