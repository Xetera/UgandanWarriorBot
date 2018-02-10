# Ugandan Warrior Bot


Security and moderation bot for telegram, inspired by https://github.com/AberrantFox/hotbot


## Getting it to work:
* Enter your bot token in config.js

* Enter your reddit app credentials in there too cuz so far it'll just give you errors `< fixing this soon`

* Build the dependencies with `npm install` otherwise it wont work, obviously

* Use debug.bat while developing to get automatic restarts with nodemon on code change and debug messages from telegraf:api 
  or debugSilent.bat to only get Bot debug notes and not the ones from telegraf

## Dev Notes:

Bot starts in index like all scripts. 

Uses Middleware to parse messages for things like arguments and match regex.

## Current dependencies:

* [Telegraf](https://github.com/telegraf/telegraf) for easier communication with the Telegram API 

* [Axios](https://github.com/axios/axios) for HTTP requests

* [Cheerio](https://github.com/cheeriojs/cheerio) for web scraping

* [Debug](https://github.com/visionmedia/debug) for, well, debugging

* [Nodemon](https://github.com/remy/nodemon) for automatic restarts while debugging

* [Snoowrap](https://github.com/not-an-aardvark/snoowrap) for Reddit integration

* [Download](https://github.com/kevva/download) for downloading web elements (optional)


# TODO:
## Listeners:
- [x] Automatically delete leaked telegram bot tokens
- [x] Automatically delete telegram invites
- [ ] Customizable blacklisted links
- [ ] Delete messages with too mentions 

## Moderation:
- [ ] Timed user mute/mediamute
- [ ] Ability to add notes to users
- [ ] Add continuous userCount polling to know when someone joins or leaves a group
- [ ] Introduce permissions for commands
- [ ] Add a strike system for keeping track of user infractions
- [ ] Automatic spam detection
- [ ] Adjustable security level for spam tolerance
- [ ] Ability for ignoring user commands
- [ ] Automatic mute command spammers
- [ ] Panic command for deleting all non-mod messages during raids

## Database:
- [x] Add a persistent db, prefereably noSQL since we're working with node
- [x] Permanently save messages
- [ ] Track \# of media per user
- [ ] Optionally move moderation commands to another server that you can link to the original
- [ ] Optionally persistent collection of spammers to blacklist from all bot instances **UNSURE** 
- [ ] Encrypt message contents

## Fun:
- [x] Random cynanide and happiness comic  
