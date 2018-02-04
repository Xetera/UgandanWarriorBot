let assert = require('assert');
let _regex = require('./../lib/Regex');

function assertInviteRegex(link){
    assert("https://t.me/joinchat/FioAnkQCWFG5qCsVQZ3bgA".match(_regex.telegramInvite));
}