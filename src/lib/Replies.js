const settings = require('../Constants').SETTINGS;

exports.errorResponse = function(stackTrace){
    let response = "Something went wrong and I don't know the wae";
    if (settings.debug){
        response += `\n${stackTrace}`
    }
    return response;
};

exports.mentionUserandReply = function(ctx, response){
    ctx.reply(`${ctx.from.username} ${response}`)
};