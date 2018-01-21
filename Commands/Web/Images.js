
// this is gonna be adding a .png suffix to imgur stuff
exports.fetchImageURLfromImgur = function(URL){
    // this is obviously not gonna be a good solution but it works for most imgur images
    return URL + '.png'
};

String.prototype.isMedia = function(){
    let regex = new RegExp('\\.(\\w){3,4}$');
    return this.match(regex);
};

exports.tryGetRedditMedia = function(post){
    let response = {};
    if (!post.is_reddit_media_domain){
        response.media = res.url; // we might want to match media type for this to send gifs properly
    }
    else if (post.is_self){
        // self posts are text-only posts
        response.media = "text";
    }
    else {
        // this is the point where we know it's not
        // a reddit domain image but also not a text post

    }

};