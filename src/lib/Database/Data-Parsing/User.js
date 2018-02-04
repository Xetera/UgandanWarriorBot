const UserSchema = require('../../../src/models/user-model');

exports.parseUserData = function(from){
    return new UserSchema(from);
};