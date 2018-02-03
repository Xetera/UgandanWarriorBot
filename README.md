# Ugandan Warrior Bot

Meme telegram bot project in node.js, influenced by https://github.com/AberrantFox/hotbot

## Getting it to work:
* Enter your bot token in config.js

* Enter your reddit app credentials in there too cuz so far it'll just give you errors

* Build the dependencies with `npm install` otherwise it wont work, obviously

* Use debug.bat while developing to get automatic restarts with nodemon on code change and debug messages from telegraf:api

* Or debugSilent.bat to only get Bot debug notes and not the ones from telegraf

## Dev Notes:

Bot starts in index like all scripts. 

Uses Middleware to parse messages for things like arguments and match regex.

## Current dependencies:

* [Telegraf](https://github.com/telegraf/telegraf) for easier communication with the Telegram API 

* [Axios](https://github.com/axios/axios) for HTTP requests

* [Cheerio](https://github.com/cheeriojs/cheerio) for web scraping

* [Debug](https://github.com/visionmedia/debug) for, well, debugging

* [Nodemon](https://github.com/remy/nodemon) for automatic restarts while working

* [Snoowrap](https://github.com/not-an-aardvark/snoowrap) for Reddit integration

* [Download](https://github.com/kevva/download) for downloading web elements (optional)

## TODO:

- [x] Automatically delete leaked bot tokens
- [x] Automatically delete invites
- [x] Add a persistent db, prefereably noSQL since we're working with node
- [ ] Permanently save messages
- [ ] Optionally move moderation commands to another server that you can link to the original
- [ ] Add more moderation commands like: timed ban
- [ ] Add continuous userCount polling to know when someone joins a group
- [ ] Add user notes for mods
- [ ] Introduce permissions for commands
- [ ] Get good ideas

