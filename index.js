// $ = Xetera

// importing local files with ./ in the beginning
let config;
const settings = require('./config');
if (!process.env.TOKEN){
    config = require('./Private');
    settings.developmentMode = true;
}

const web = require('./Commands/Web/Web');
const setup = require('./lib/Setup');
const replies = require('./lib/Replies');
const constants = require('./Constants');
const debug = require('./Development/Debug').debug;
const listeners = require('./lib/Listeners');
const save = require('./lib/Save');
const reddit = require('./Commands/Web/Reddit');


const Reddit = require('./Commands/Web/Reddit');
// libraries just straight up as it is
const Telegraf = require('telegraf');


bot = new Telegraf(process.env.TOKEN || config.BETA_TOKEN);


// Updating info & setup
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

    // returns argument type
    let messageType = listeners.middleWare(ctx, start);


    
    return next().then(() => {
        // this part gets run after we're done with handling the request

        if (messageType === "command"){ // we only want to log command response time
            const ms = new Date() - start;
            let color;
            if (ms < 100){
                color = "green" // TODO: see if we can get response time based colors to work
            }
            debug.info('Responded to request in ', ms + 'ms')
        }
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
    // we don't want to all these things in index so we'll modularize this part later

    // no argument
    if (!ctx.args.argArray[0]){
        ctx.reply("No subreddit specified, sending random"); // $ delete this once we send the picture?
        return reddit.getTopRandomPost().then(resp=>{
            reddit.sendRedditResponse(ctx, resp);
        });
    }

    // only looking at the first argument since subreddit names are one word
    let subreddit = ctx.args.argArray[0];

    return reddit.getTopPost(subreddit).then(resp=>{
        reddit.sendRedditResponse(ctx, resp);
    });

});

bot.command('test', ctx => {
    // test
    ctx.reply("https://media.giphy.com/media/SXeezvYc8uRUc/giphy.gif\nTest");
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
// for now this isn't really working the way we want it to
bot.catch(err => {

});



// starts the bot
bot.startPolling()
    .catch(e => {
        // this is just a general catch, it gets called when there's
        // a mistake somewhere else in our code like we call a function
        // that's not defined, have scoping problems etc
        debug.error(e);

    });
