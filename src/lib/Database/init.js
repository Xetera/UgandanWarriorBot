let mongoose = require('mongoose');
const settings = require('../../../config');
const debug = require('../../Development/Debug').debug;

exports.login = function(){
    let date = new Date();
    if (settings.developmentMode)
        mongoose.connect('mongodb://localhost/telegram').then(() => {
            debug.info('Connected to MongoDB [[localhost]] in %o.', new Date() - date + ' milliseconds');
        }).catch(err => {
            debug.error('Problem connecting to MongoDB.');
            console.error(err);
        });
    else
        mongoose.connect(/* replace with heroku database for development*/);
};