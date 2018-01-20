const snoowrap = require('snoowrap');
const config = require('../../config');
const images = require('./Images');

const r = new snoowrap({
    userAgent: "Reddit integration for UgandanWarriorBot on Telegram",
    clientId: config.REDDIT_CLIENT_ID,
    clientSecret: config.REDDIT_CLIENT_SECRET,
    refreshToken: config.REDDIT_REFRESH_TOKEN
});

/**
 *
 * @param {string} subReddit
 * @return {Promise<{postTitle: string, imageURL: string}>}
 */
function getTopPost(subReddit){
    let out = {};
    return new Promise(function(resolve, reject){
        r.getSubreddit(subReddit).getTop().then(res=> {
            // this is obviously not going to work for things that aren't from imgur
            // or for images that we can't
            debug.info(res[0].title);
            if (!res[0].url.includes('.png'))
                out.imageURL = images.fetchImageURLfromImgur(res[0].url);
            else {
                out.imageURL = res[0].url;
            }
            out.postTitle = res[0].title;
            resolve(out);
        }).catch(err=>{
            debug.error(err);
            reject(err);
        });
    });
}

exports.getTopPost = getTopPost;