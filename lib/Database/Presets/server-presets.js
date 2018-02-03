const UserSchema = require('../../../models/server-model');

exports.saveServer = function(ctx){
    ctx.getChat().then(chat => {
        console.log(chat);
    })
};