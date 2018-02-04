const UserSchema = require('../../../models/user-model');

exports.parseUserData = function(from){
    return new UserSchema(from);
};