const client = require('../structures/Client.js');

client.on('guildDelete', guild => {
  client.user.setGame('on ' + client.guilds.size + ' servers | ' + client.config.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});