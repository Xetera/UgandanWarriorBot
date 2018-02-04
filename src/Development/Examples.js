/*
 * For now this is gonna be where we keep track of how to extract information from things like
 * messages without googling a million things over and over again
 */

// here's all the information we get from ctx.message when someone triggers one of our things
// it seems like a waste doing something but the documentation for telegraf isn't that great tbh

// not sure if this applies to everything like idk a payment or something like that

/* ctx.message */
let messageInfo = {
    "message_id": "message id, no shit",
    "from":
        {
            "id": "the id of the user",
            "is_bot": "if the sender of the message is a bot",
            "first_name": "Probably what you have your name set to and not your username",
            "username" : "username"
        },
    "chat":
        {
            "id": "same as from ID when it's pm",
            "first_name" : "same as the first_name in from",
            "type": "type of message. Private if it's pm, obviously"
        },
    "date": "date in unix timestamp format",
    "text": "the thing that we messaged the dude",
    "entities":
        [
            {
                "offset": "no clue what this is",
                "length": "length of the message, pretty useless",
                "type": "whether the message is a command or a hear or something else"
            }
        ]
};

let serverInfo = {

}
// not sure why entities is in an array but ok
