// $ = Xetera

// importing local files with ./ in the beginning
const config = require('./config');
const web = require('./Commands/Web');
const setup = require('./lib/Setup');

// libraries just straight up as it is
const Telegraf = require('telegraf');


global.bot = new Telegraf(config.BOT_TOKEN, {
    username: "UgandanWarriorBot"
});

// Updating info
setup.login(bot);

web.ch();


bot.start((ctx) => {
    console.log('started:', ctx.from.id);
    return ctx.reply('Welcome!');
});


bot.command('help', ctx => {
    ctx.reply('Whatsapp : not da wae\nTelegram : definitely waed');
});


bot.hears('hi', ctx => {
    ctx.reply('Hey there!');
});

bot.command('ch', async(ctx) => {
    web.ch().then(img => {
        ctx.replyWithPhoto(img);
    });
});


// regex voodoo, $ you're probably more knowledgeable about this than I am lmao
bot.hears(/buy/i, ctx => {
    ctx.reply('Buy-buy!');
});

bot.on('sticker', ctx => {
    ctx.reply('👍')
});

bot.startPolling();
