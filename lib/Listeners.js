const debug = require('../Development/Debug').debug;
const handler = require('./Handler');

// I know this is VERY basic but it's the best I can come up with right now lmao
// I haven't seen enough tokens but this seems to be the general idea
let tokenRegex = /\d{9}:AA\w{33}/;



String.prototype.isToken = function(){
    return this.match(tokenRegex);
};



// we don't want to do anything malicious, just remove the message and notify the user
/**
 *
 * @param {} ctx
 */
function checkTokenLeak(ctx){
    if (ctx.message.text.isToken()){
        debug.warning('Detected a leaked token, attempting to remove it.');
        removeToken(ctx);
    }
}

function removeToken(ctx){
    let messageDeleted = false;
    ctx.deleteMessage()
        .then(() => {
            messageDeleted = true;
            debug.info("Bot token deleted successfully.");

        })
        .catch(e=>{
            if (handler.CannotDeleteMessage(e)){
                // we don't want the bot informing everyone that
                // there was a leaked token if we can't remove it
                messageDeleted = false;
                debug.warning("Unable to delete bot token.")
            }
            else {
                debug.error(e);
                messageDeleted = false;
            }
        })
        .then(()=>{
            if (messageDeleted === true) {
                ctx.reply("I deleted your message because it had a bot token, make sure to not share these with people");
            }
        });

    // we want to check explicitly in case it does some
    // weird javascript magic with its conversions



}

exports.tokenRegex = tokenRegex;
exports.checkTokenLeak = checkTokenLeak;

