const fs = require("fs");
//const fileName = '../Servers.json';
//const save = require(fileName);

function addNewServer(serverName){
    save[serverName] = {};
    saveFile();
}

function saveFile(){
    fs.writeFile("Settings.json", JSON.stringify(save), function(err){
        if (err) return console.error(err);
        console.log(JSON.stringify(save));
        console.log("Saving...");
    })
}

exports.addNewServer = addNewServer;