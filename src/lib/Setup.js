const constants = require("../../Constants");
const mongodb = require('./Database/init');
const debug = require('../Development/Debug');


// we don't want to call this function every time we need it so we're saving it instead
exports.login = function(bot){
    // logging into mongodb, clearly
    mongodb.login();

    bot.telegram.getMe().then(self => {
            constants.BOT.ID = self.id;
            constants.BOT.FIRST_NAME = self.first_name;
            constants.BOT.USERNAME = self.username;

            // setting the bot username dynamically so
            // we can catch commands in group chats
            bot.options.username = constants.BOT.USERNAME;

            console.log(`${self.username} successfully logged in.`);
            bot.telegram.sendMessage(-1001196751324, "Bot Running");
        }).catch(e => {
            debug.error('Error getting bot data for setup.', e);
        });
};