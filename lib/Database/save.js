const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const serverModel = require('../../models/server-model');

/**
 *
 * @param {mongoose.Model} user
 */
exports.saveUser = function(user) {
    user.save();
};

exports.saveServer = function(server) {
    server.save().then(()=>{
        debug.info('Saved!');
    })
};