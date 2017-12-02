const client = require('../structures/Client.js');
const credentials = require('../../credentials.json');

client.on('guildDelete', guild => {
  client.user.setGame('on ' + client.guilds.size + ' servers | ' + credentials.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});