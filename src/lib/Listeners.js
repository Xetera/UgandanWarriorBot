const debug = require('../Development/Debug');
const handler = require('./Handler');
const util = require('./Utility');

save = require('./Database/save.js');
find = require('./Database/find.js');
create = require('./Database/create');

const parser = require('./Database/Data-Parsing/User');
const enums = require('../lib/Enums');
const _regex = require('./Regex');


// I know this is VERY basic but it's the best I can come up with right now lmao
// I haven't seen enough tokens but this seems to be the general idea


const tokenRegex = _regex.telegramBotToken;
const inviteRegex = _regex.telegramInvite;

// prototyping builtin classes isn't actually a very good thing to do
// maybe we can just make these a standalone function later
String.prototype.isToken = function(){
    return this.match(tokenRegex);
};

String.prototype.isInvite = function() {
    return this.match(inviteRegex);
};


function middleWare(ctx, start){

    let messageType;

    if (ctx.chat.type === enums.groupType.SUPERGROUP){
        const serverID = ctx.chat.id;
        let messageModel = create.createMessage(ctx);

        let serverModel;
        find.findServer(serverID).then(server => {

            if (!util.serverExists(server)){ // server doesn't exist

                let _serverModel = create.createServer(ctx);
                serverModel = _serverModel;
                save.saveServer(_serverModel);
            }
            else {
                serverModel = server[0];
            }
            find.findUser(ctx.from.id, serverModel).then(user => {
                let userModel;

                if (!user.length){
                    userModel = create.createUser(ctx);
                    save.saveUserInServer(userModel);
                    save.incrementMessageCount(userModel, serverModel);
                }
                else {
                    userModel = user[0];
                }

                //save.saveUserInServer(userModel);
                save.incrementMessageCount(userModel, serverModel);

                save.saveMessage(messageModel);
                save.saveUserInServer(userModel);
            });
        });
    }
    else if (ctx.chat.type === enums.groupType.PRIVATE){

    }


    let UserData = parser.parseUserData(ctx.from);
    //saveUser(UserData);



    // we only want this to run if the message we got was a text
    // otherwise the bot might break
    if (ctx.message.text) {
        messageType = checkCommand(ctx, start);

        // see if the message matches any of the things that we're checking for

        checkRegex(ctx);

        // we're parsing the info to extend the context
        // to include arguments given in the command
        ctx.args = getArgs(ctx);
    }
    return messageType;
}

/**
 * Checks if the user message is a command or not
 *
 * @param ctx
 * @param date
 * @returns {string}
 */
function checkCommand(ctx, date){

    if (ctx.message.text.substring(0,1) === '/'){
        debug.info('Heard command %o', ctx.message.text, ` ${date}`);
        return "command";
    }
    else {
        debug.info(`${ctx.from.first_name} wrote %o`, `${ctx.message.text}`);
    }
}

// we don't want to do anything malicious, just remove the message and notify the user
/**
 *
 * @param ctx
 *
 */
function checkRegex(ctx){
    if (ctx.message.text.isToken()){
        debug.warning('Detected a leaked token, attempting to remove it.');
        deleteLastMessage(ctx, "Token");
    }
    // add a thing here that also checks for settings that prevents invites
    if (ctx.message.text.isInvite()){
        debug.warning('New invite detected, attempting to remove it.');
        deleteLastMessage(ctx, "Invite")
    }
}

/**
 * Extracts arguments from user messages
 *
 * @param ctx
 * @return {{argString: string, argArray: string[]}}
 *
 */
function getArgs(ctx){
    let out = {};
    // splitting the arguments
    let array = ctx.message.text.split(' ');
    // splice(1, array.length) -> starting from index 1 (past the / command) return all elements until the end
    array = array.splice(1, array.length);

    out.argArray = array;

    // joining array elements with a space
    out.argString = array.join(' ');
    return out;
}


function deleteLastMessage(ctx, type){
    let messageDeleted = false;
    ctx.deleteMessage()
        .then(() => {
            messageDeleted = true;
            debug.info(type + " deleted successfully.");
        })
        .catch(e=>{
            // if we can't delete because we're lacking permissions
            if (handler.CannotDeleteMessage(e)){
                messageDeleted = false;
                debug.warning("Unable to delete " + type)
            }
            else {
                // if the problem isn't a lack of permission then
                // actually raise an exception, don't ignore
                debug.error(e);
                messageDeleted = false;
            }
        })
        .then(()=>{
            // this part only runs if we deleted the message successfully
            if (messageDeleted === true) {
                if (type === "Token")
                    ctx.reply(`@${ctx.from.username} I deleted your message because it had a bot token, make sure to not share these with people`);
                else if (type === "Invite"){
                    // here we could be doing something like keeping track of user strikes for invites?
                    ctx.reply(`@${ctx.from.username} Group invites are not allowed on this server.`);

                }
            }
        });

    // we want to check explicitly in case it does some
    // weird javascript magic with its conversions


}
exports.middleWare = middleWare;
exports.checkCommand = checkCommand;
exports.tokenRegex = tokenRegex;
exports.checkRegex = checkRegex;
exports.getArgs = getArgs;
