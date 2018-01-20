const axios = require('axios');
const cheerio = require('cheerio');


const util = require('../../lib/Utility');
const constants = require('../../Constants');

/**
 * fetches the URL of a random Cyanide and Happiness comic
 *
 * @returns {Promise<string>} - URL of the comic
 */
function ch(){
    // creating a new promise
    return new Promise(function(resolve, reject){
        // $here's an interesting problem with this, I can just plug in the latest
        // value for the max range now and it would work but it would be cool if the
        // bot constantly updated the latest version. We can work on that later tho.
        let latestComicID = 4828;
        let random = util.randRange(latestComicID);

        // sometimes this will give us a straight up text saying 'Could not find comic'
        // because some # of comics are missing.
        let URL = constants.URLS.CH_BASE_URL + 'comics/' + random + '/';
        debug.info('Trying to fetch comic');
        axios.get(URL).then(res=>{
            let $ = cheerio.load(res.data);
            let comic = $('#main-comic').attr('src');

            // files hosted on explosm start with //files.explosm.etc so we have to put a
            // http: in front of it so the downloader doesn't shit itself
            resolve('http:' + comic);
            debug.info('Retrieved comic successfully');


        }).catch(e=>{
            debug.error(e);
            if (e.response.status === 404){
                // some comics are empty so we want to retry when that happens and
                // hope that we eventually get a comic.
                console.log('Comic not found, retrying.');


                ch();
            }
            // if the problem isn't a 404 then there's another problem that we have to catch
            debug.error('Problem with reaching website', e);

            reject(e);
        });
    });

}




exports.ch = ch;