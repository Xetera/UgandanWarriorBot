const fs = require('fs');


/* $javascript is basically useless with it's random library
 * so I like to make my own instead.
 *
 * JS is weakly typed so these JSDocs helps the ide figure out types
 * for when you're passing in parameters and stuff
 */


/**
 * Generates a random number between a certain range
 *
 * @param {number} min
 * @param {number} range
 * @returns {number}
 */
exports.randRange = function(range, min=0){
    if (!min){
        return Math.floor(Math.random() * range);
    }
    return Math.floor(Math.random() * (min - range + 1)) + min
};


exports.flattenObject = function(obj1, obj2){
    for (let i in obj2){

        obj1[i] = obj2[i];

    }
    return obj1;
};

exports.serverExists = function(server){
    return server.length;
};

