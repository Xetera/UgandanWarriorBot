function CannotDeleteMessage(error){
    return error.description === "Bad Request: message can't be deleted";
}


exports.CannotDeleteMessage = CannotDeleteMessage;