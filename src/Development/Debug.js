const dbg = require('debug');

// debugging
debug = {};
debug.info    = dbg('Bot:Info');
debug.warning = dbg('Bot:Warning');
debug.error   = dbg('Bot:Error');


module.exports = debug;