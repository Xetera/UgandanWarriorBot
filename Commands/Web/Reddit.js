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
 * @return {Promise<{postTitle: string, mediaURL: string, type: string}>}
 */
function getTopPost(subReddit){
    let out = {};
    return new Promise(function(resolve, reject){
        r.getSubreddit(subReddit).getTop().then(res=> {
            // this is obviously not going to work for things that aren't from imgur
            // or for images that we can't
            debug.info(res[0]);
            let type = !res[0].url.isMedia();
            if (type)
                out.imageURL = images.fetchImageURLfromImgur(res[0].url);
            else {
                out.imageURL = res[0].url;
            }
            out.postTitle = generateCaption(res[0]);
            out.type = type;
            resolve(out);
        }).catch(err=>{
            debug.error(err);
            reject(err);
        });
    });
}

/**
 * fetching top post from a random subreddit
 * @returns {Promise<{postTitle: string, type: string}>}
 */
function getTopRandomPost(){
    let out = {};
    return new Promise(function(resolve, reject){
        r.getSubreddit('random').getHot().then(res=> {
            // this is obviously not going to work for things that aren't from imgur
            // or for images that we can't
            debug.info(res[0]);
            let type = !res[0].url.isMedia();

            if (type)
                out.imageURL = images.fetchImageURLfromImgur(res[0].url);
            else {
                out.imageURL = res[0].url;
            }
            out.postTitle = generateCaption(res[0]);
            out.type = type;
            resolve(out);
        }).catch(err=>{
            debug.error(err);
            reject(err);
        });

    });
}

function generateCaption(post){
    return `${post.subreddit_name_prefixed} - ${post.ups} upvotes \n${post.title}  `
}

exports.getTopRandomPost = getTopRandomPost;
exports.getTopPost = getTopPost;