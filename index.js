// $ = Xetera
/*
 * You can launch this code
 */

// importing local files with ./ in the beginning
const config = require('./config');
const web = require('./Commands/Web');
const setup = require('./lib/Setup');
const replies = require('./lib/Replies');
const constants = require('./Constants');
const debug = require('./Development/Debug').debug;
const listeners = require('./lib/Listeners');

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
    const start = new Date();
    listeners.checkTokenLeak(ctx);

    return next().then(() => {
        const ms = new Date() - start;
        debug.info('response time %sms', ms)
    });
});


bot.start((ctx) => {
    console.log('started:', ctx.from.id);
    return ctx.reply('Welcome!');
});





bot.command('help', ctx => {
    ctx.reply('Whatsapp : not da wae\nTelegram : definitely waed');
});


bot.hears(/stupid bot/i, ctx => {
    ctx.reply('Hey watch your mouth motherfucker');
});

bot.command('hi', ctx => {

    ctx.reply(`Hi [${ctx.from.first_name}](${ctx.from.id})!`);
});



bot.command('ch', async(ctx) => {
    debug.info('Got request for %o', '/ch');
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
