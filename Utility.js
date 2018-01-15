const Download = require('Download');
const fs = require('fs');


/* $javascript is basically useless with it's random library
 * so I like to make my own instead.
 *
 * JS is weakly typed so these JSDocs helps the ide figure out types
 * for when you're passing in parameters and stuff
 */


/**
 * Generates a random number between a certain range
 *
 * @param {number} min
 * @param {number} range
 * @returns {number}
 */
exports.randRange = function(range, min=0){
    if (!min){
        return Math.floor(Math.random() * range);
    }
    return Math.floor(Math.random() * (min - range + 1)) + min
};

/**
 * Downloads the selected file
 *
 * @param {string} url
 * @param {string} name
 */
exports.downloadImage = function(url, name) {
    // name = 'images/comic.png'
    // name.split('\n') =  ['images', 'comic.png']
    // name.pop()       =  ['comic.png']             removes and returns last element
    // name.split('.')  =  ['comic', 'png']
    // name.shift()     =  ['comic']                 removes and returns first element
    let imageName = name.includes('/') ? name.split('/').pop().split('.').shift() : name;
    return new Promise(function(resolve, reject){
        Download(url).then(data=>{
            fs.writeFileSync(name, data);
            console.log(`${imageName} downloaded successfully.`);

            resolve(name);
        }).catch(e=>{
            log.error(`There was an error downloading ${imageName}.`);
            reject();
        });
    });
};


log = {};
exports.log = log;

// these aren't completely very useful without the color module but
// we'll eventually get this on a vps so colors won't even be shown
// also we should most definitely be using a library for this lmao
log.info = function(str){
    console.log('[INFO]: ' + str);
};

log.warning = function(str){
    console.log('[WARNING]: ' + str)
};

log.error = function(str){
    console.log('[ERROR]: ' + str);
};