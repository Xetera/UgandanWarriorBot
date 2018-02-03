const mongoos = require('mongoose');
const userSchema = require('../../models/user-model');

exports.findUser = function(id){
    return new Promise(function(resolve, reject){
        userSchema.find().then(doc => {
            resolve(doc);
        })
    });

}