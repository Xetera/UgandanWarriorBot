const snoowrap = require('snoowrap');
const config = require('../../config');
const images = require('./RedditParser');
const util = require('../../lib/Utility');


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

            debug.info(res[0]);

            // getting object response and flattening it into our 'out' object
            // because we don't want unnecessary branches
            util.flattenObject(out, images.parseRedditResponse(res[0]));

            out.postTitle = generateCaption(res[0]);
            debug.warning(out);
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

            // getting object response and flattening it into our 'out' object
            // because we don't want unnecessary branches
            util.flattenObject(out, images.parseRedditResponse(res[0]));

            out.postTitle = generateCaption(res[0]);
            debug.warning(out);
            resolve(out);
        }).catch(err=>{
            debug.error(err);
            reject(err);
        });

    });
}

/**
 * Generating caption for the /reddit response
 *
 * @param {object} post
 * @returns {string}
 */
function generateCaption(post){
    return `${post.subreddit_name_prefixed} - ${post.ups} upvotes \n${post.title}  `
}


exports.sendRedditResponse = function(ctx, resp){
    if (resp.type === "text"){
        ctx.reply(resp.postTitle + '\n\n' + resp.text + '\n' + resp.url);
    }
    else if (resp.type === "photo"){
        let caption = resp.url ? resp.postTitle + resp.url : resp.postTitle;
        ctx.replyWithMediaGroup([{
            media: resp.media,
            caption: caption,
            // we really have to fix this and make sure
            // we're controlling for different types of media
            type: "photo"
        }]);
    }
    else if (resp.type === 'gif'){
        ctx.reply(resp.postTitle + resp.text);
        ctx.replyWithDocument(resp.media);
    }
};


exports.getTopRandomPost = getTopRandomPost;
exports.getTopPost = getTopPost;