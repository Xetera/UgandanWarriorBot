const log = require('../Utility').log;
const constants = require("../Constants");

// we don't want to call this function every time we need it so we're saving it instead
exports.login = function(bot){
    bot.telegram.getMe().then(self => {
        constants.BOT.ID = self.id;
        constants.BOT.FIRST_NAME = self.first_name;
        constants.BOT.USERNAME = self.username;

        log.info(`${self.username} is now online.`);
    });
};