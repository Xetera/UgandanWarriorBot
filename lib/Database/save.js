const mongoose = require('mongoose');
const userModel = require('../../models/user-model');

/**
 *
 * @param {mongoose.Model} user
 */
exports.saveUser = function(user) {
    user.save();
};