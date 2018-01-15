const axios = require('axios');
const cheerio = require('cheerio');


const util = require('../Utility');
const constants = require('../Constants');

function ch(){
    // creating a new promise
    return new Promise(function(resolve, reject){
        // $here's an interesting problem with this, I can just plug in the latest
        // value for the max range now and it would work but it would be cool if the
        // bot constantly updated the latest version. We can work on that later tho.
        let random = util.randRange(4828);

        // sometimes this will give us a straight up text saying 'Could not find comic'
        // because some # of comics are missing.
        let URL = constants.URLS.CH_BASE_URL + 'comics/' + random + '/';

        axios.get(URL).then(res=>{
            let $ = cheerio.load(res.data);
            let comic = $('#main-comic').attr('src');

            // files hosted on explosm start with //files.explosm.etc so we have to put a
            // http: in front of it so the downloader doesn't shit itself
            resolve('http:' + comic);


            // $ turns out you don't need to download images with telegram to send them lol I'm dumb
            /*
            util.downloadImage("http:" + comic, 'images/comic.png').then(img => {
                // resolve the outer promise if the download promise is returned
                resolve(img);
            }).catch(err =>  {
                // reject the entire thing if the download promise is rejected
                reject(err)
            });
            */

        }).catch(e=>{
            if (e.response.status === 404){
                // some comics are empty so we want to retry when that happens and
                // hope that we eventually get a comic.
                console.log('Comic not found, retrying.');

                ch();
                // not sure if this is needed to prevent it from rejecting, I don't
                // have too much experience with recursive functions
            }
            // if the problem isn't a 404 then there's another problem
            reject(e);
        });
    });

}


// writes


exports.ch = ch;