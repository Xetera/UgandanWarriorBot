const Download = require('Download');
const log = require('./Utility').log;
const fs = require('fs');


/**
 * Downloads the selected file
 *
 * @param {string} url - URL of the picture
 * @param {string} name - the name or directory that the download will be saved at
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
        }).catch(e => {
            log.error(`There was an error downloading ${imageName}.`);
            reject(e);
        });
    });
};

/**
 * NOT TESTED - This should let us download multiple images
 * not that we're ever going to need this lmao
 *
 * uses the name of the file as the name so it's kinda shitty
 * @param {string[]} urls
 */
exports.downloadAllImages = function(urls) {
    Promise.all([urls]
        .map(url => Download(url, url)))
        .then(() => {
            console.log('All files downloaded')
        })
        .catch(e => {
            console.log('There was an error downloading one or all images');
            console.error(e);
        });
};