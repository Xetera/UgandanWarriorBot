// $ = Xetera
/*
 * You can launch this code
 */

// importing local files with ./ in the beginning
const config = require('./config');
const web = require('./Commands/Web/Web');
const setup = require('./lib/Setup');
const replies = require('./lib/Replies');
const constants = require('./Constants');
const debug = require('./Development/Debug').debug;
const listeners = require('./lib/Listeners');
const save = require('./lib/Save');


const Reddit = require('./Commands/Web/Reddit');
// libraries just straight up as it is
const Telegraf = require('telegraf');


bot = new Telegraf(config.BOT_TOKEN);


// Updating info
setup.login(bot);

/*
 * Setting up our middleware, this function is going to get run
 * first every single time someone sends a message, that way we
 * can do things like store messages before we respond to them
 * or do regex matching or whatever
 */
bot.use((ctx, next) => {
    // this part is run before any other function receives the request
    const start = new Date();

    // we only want this to run if the message we got was a text
    // otherwise the bot might break
    if (ctx.message.text) {
        listeners.getArgs(ctx);
        listeners.checkRegex(ctx);
        ctx['args'] = listeners.checkCommand(ctx);
    }

    return next().then(() => {
        // this part gets run after we're done with handling the request
        const ms = new Date() - start;
        debug.info('Responded to request in %sms', ms)
    });
});







bot.start((ctx) => {
    console.log('started:', ctx.from.id);
    return ctx.reply('Welcome!');
});


bot.command('invites', ctx => {
    // getting the title of the group chat
    let groupChat = ctx.update.message.chat;
    debug.info()
    //save.addNewServer(groupChat);
    //save.addNewServer();
});

bot.command('reddit', ctx => {
    Reddit.getTopPost('funny').then(resp=>{
        ctx.replyWithMediaGroup([{
            media: resp.imageURL,
            caption: resp.postTitle,
            type: 'photo'
        }]);
    })
});


bot.command('help', ctx => {
    ctx.reply('Whatsapp : not da wae\nTelegram : definitely wae');
});


bot.hears(/stupid bot/i, ctx => {
    ctx.reply('Hey watch your mouth motherfucker');
});

bot.command('hi', ctx => {
    debug.warning(ctx.args);
    ctx.reply(`Hi @${ctx.from.username}!`);
});



bot.command('ch', async(ctx) => {
    /* instead of using .then() we can make our functions
     * asynchronous and just call await which makes things
     * much simpler. This works on any promise so you don't
     * have to change the promise itself, just the function
     * you're calling it in to async.
     */
    let picture = await web.ch();

    try {
        await ctx.replyWithPhoto(picture);
    }
    catch (e){
        ctx.reply(replies.errorResponse(e))
    }

});


// regex voodoo, $ you're probably more knowledgeable about this than I am lmao
bot.hears(/buy/i, ctx => {
    ctx.reply('Buy-buy!');
});

// preset words for actions like sending stickers I guess
bot.on('sticker', ctx => {
    ctx.reply('👍')
});

// catching telegraf's errors
bot.catch(err => {
    //debugError("Telegraf Error", err);
});



// starts the bot
bot.startPolling()
    .catch(e => {
        // this is just a general catch, it gets called when there's
        // a mistake somewhere else in our code like we call a function
        // that's not defined, have scoping problems etc
        debug.error(e);
    });
