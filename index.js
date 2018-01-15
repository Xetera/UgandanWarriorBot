// $$ = Xetera

// $$importing local files with ./ in the beginning
const config = require('./config');
// $$libraries just straight up as it is
const Telegraf = require('telegraf');

const bot = new Telegraf(config.BOT_TOKEN, {
    username: "UgandanWarriorBot"
});


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


// $$regex voodoo, you're probably more knowledgeable about this than I am lmao
bot.hears(/buy/i, ctx => {
    ctx.reply('Buy-buy!')
});

bot.on('sticker', ctx => {
    ctx.reply('👍')
});

bot.startPolling();
