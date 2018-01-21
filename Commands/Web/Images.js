
// this is gonna be adding a .png suffix to imgur stuff
exports.fetchImageURLfromImgur = function(URL){
    // this is obviously not gonna be a good solution but it works for most imgur images

    debug.info("Attempting to manually get photo URL");
    return URL + '.png'
};

String.prototype.isMedia = function(){
    let regex = new RegExp('\\.(\\w){3,4}$');
    return this.match(regex);
};

function isImgurLink(link){
    return link.contains('imgur')
}



exports.tryGetRedditMedia = function(post){
    let response = {};
    debug.info(post.url);
    if (!post.is_reddit_media_domain){
        response.media = post.url; // we might want to match media type for this to send gifs properly
    }
    else if (post.is_self){
        // self posts are text-only posts
        response.media = "text";
    }
    else if (isImgurLink(post.url)){

            // this is the point where we know it's not
        // a reddit domain image but also not a text post

    }
    else {
        response.media = post.thumbnail;
    }
    return response;
};