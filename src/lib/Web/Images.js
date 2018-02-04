
// this is gonna be adding a .png suffix to imgur stuff
exports.fetchImageURLfromImgur = function(URL){
    // this is obviously not gonna be a good solution but it works for most imgur images
    return URL + '.png'
};