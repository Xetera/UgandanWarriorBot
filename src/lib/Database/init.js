let mongoose = require('mongoose');
const settings = require('../../../config');
const debug = require('../../Development/Debug');


exports.login = function(){
    let date = new Date();
    if (settings.developmentMode)
    {
        mongoose.connect('mongodb://localhost/telegram').then(() => {
            debug.info('Connected to MongoDB [[localhost]] in %o.', new Date() - date + ' milliseconds');
        }).catch(err => {
            debug.error('Problem connecting to MongoDB.');
            console.error(err);
        });
    }
    else {
        mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds123718.mlab.com:23718/heroku_810nbf98`)
            .then(() => {
                debug.info('Connected to MongoDB [[cloud]] in %o.', new Date() - date + ' milliseconds');
            }).catch(err => {
                debug.error('Problem connecting to MongoDB.');
            console.error(err);
        });
    }

};