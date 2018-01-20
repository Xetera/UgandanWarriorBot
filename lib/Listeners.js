const debug = require('../Development/Debug').debug;
const handler = require('./Handler');

// I know this is VERY basic but it's the best I can come up with right now lmao
// I haven't seen enough tokens but this seems to be the general idea
let tokenRegex = /\d{9}:AA\w{33}/;
let inviteRegex = new RegExp('(https?)://t.me/joinchat/[A-z 0-9 -_]+');

// prototyping builtin classes isn't actually a very good thing to do
// maybe we can just make these a standalone function later
String.prototype.isToken = function(){
    return this.match(tokenRegex);
};

String.prototype.isInvite = function() {
    return this.match(inviteRegex);
};

function checkCommand(ctx){
    if (!ctx.message.text) return;
    if (ctx.message.text.substring(0,1) === '/'){
        debug.info('Heard command %o', ctx.message.text);
    }
    debug.info(`${ctx.from.first_name} wrote %o`, `${ctx.message.text}`)
}

// we don't want to do anything malicious, just remove the message and notify the user
/**
 *
 * @param ctx
 *
 */
function checkRegex(ctx){
    if (!ctx.message.text) return; // the context isn't a message so just return
    if (ctx.message.text.isToken()){
        debug.warning('Detected a leaked token, attempting to remove it.');
        deleteLastMessage(ctx, "Token");
    }
    if (ctx.message.text.isInvite()){
        debug.warning('New invite detected, attempting to remove it.');
        deleteLastMessage(ctx, "Invite")
    }
}

/**
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
            debug.info("User message deleted successfully.");
        })
        .catch(e=>{
            if (handler.CannotDeleteMessage(e)){
                // we don't want the bot informing everyone that
                // there was a leaked token if we can't remove it
                messageDeleted = false;
                debug.warning("Unable to delete message.")
            }
            else {
                debug.error(e);
                messageDeleted = false;
            }
        })
        .then(()=>{
            if (messageDeleted === true) {
                if (type === "Token")
                    ctx.reply("I deleted your message because it had a bot token, make sure to not share these with people");
                else if (type === "Invite")
                    ctx.reply("Group invites are not allowed on this server. ");

            }
        });

    // we want to check explicitly in case it does some
    // weird javascript magic with its conversions


}

exports.checkCommand = checkCommand;
exports.tokenRegex = tokenRegex;
exports.checkRegex = checkRegex;
exports.getArgs = getArgs;
