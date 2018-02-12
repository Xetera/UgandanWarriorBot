const userModel = require('../../models/user-model');
const debug = require('../../Development/Debug');

const getMessageCount = function(ctx){
    const server_id = ctx.chat.id;
    const user_id   = ctx.from.id;
    return new Promise(function(resolve, reject){
        console.log('FINDING ONE');
        userModel.findOne({id: user_id, server_id: server_id}).then(user => {
            console.log(user);
            resolve(user.messageCount);
        }).catch(err => {
            reject(err);
            debug.error(err);
        })
    });
};

module.exports = getMessageCount;