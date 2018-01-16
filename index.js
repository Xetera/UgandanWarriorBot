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
bot.use((ctx, next) => {
    if (ctx.message.text.isToken()){
        ctxremove();
    }
});
*/
bot.start((ctx) => {
    console.log('started:', ctx.from.id);
    console.log(ctx.chat);
    console.log(ctx.message);

    return ctx.reply('Welcome!');
});

bot.use((ctx, next) => {
    const start = new Date();
    listeners.checkTokenLeak(ctx);

    return next().then(() => {
        const ms = new Date() - start;
        console.log('response time %sms', ms)
    });
});




bot.command('help', ctx => {
    ctx.reply('Whatsapp : not da wae\nTelegram : definitely waed');
});


bot.hears('hi', ctx => {

});

bot.command('hi', ctx => {

    ctx.reply(`Hi [${ctx.from.first_name}](${ctx.from.id})!`);
});



bot.command('ch', (ctx) => {
    debugInfo('Got request for %o', '/ch');
    web.ch()
        .then(img => {
        ctx.replyWithPhoto(img);
    })
        .catch(e=> {

            ctx.reply(replies.errorResponse(e))
        });
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
        // we should be catching this with a debug thing but whatever I don't care
        debug.error(e);
    });
