
// this is gonna be adding a .png suffix to imgur stuff
exports.fetchImageURLfromImgur = function(URL){
    // this is obviously not gonna be a good solution but it works for most imgur images

    debug.info("Attempting to manually get photo URL");
    return URL + '.png'
};

String.prototype.isMedia = function(){
    let regex = new RegExp('\\.(\\w){3,4}$');

    return this.match(regex)
};

function isImgur(){
    return this.match(/imgur/);
}

function isImgurLink(link){
    return link.match(/imgur/);
}

function isGif(link){
    return link.match(/gif/) || link.match(/gfycat./);
}



function parseSelfPostText(text){
    return (text.slice(100));
}

exports.parseRedditResponse = function(post){
    let response = {};
    debug.info("POST URL " + post.url);
    if (post.is_self){
        // self posts are text-only posts
        //TODO: self posts can get kind of wild so we might want to look for
        //TODO: \n characters and break after a certain amount so we don't send
        //TODO: entire paragraphs of self post text
        response.media = post.thumbnail.isMedia() ? post.thumbnail : null;
        response.text = parseSelfPostText(post.selftext);
        response.type = 'text';

        debug.warning("post is self post")
    }
    else if (post.url.isMedia() || isImgurLink(post.url)){
        if (isImgurLink(post.url)) response.media = post.url + '.png';
        else response.media = post.url;

        if (isGif(post.url)){
            response.type = 'gif';
        }
        else {
            response.type = "photo";
        }

        // this is the point where we know it's not
        // a reddit domain image but also not a text post

    }
    else if (post.is_video){
        // not sure how to get this
    }
    else{
        // post is not self or media, send the link
        debug.error(post.url);
        debug.warning("getting post thumbnail instead");
        response.media = post.thumbnail.isMedia() ? post.thumbnail : null;
        response.text = post.url;
        response.type = 'photo';
    }
    debug.error(response.media);
    return response;
};

