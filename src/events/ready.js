const client = require('../structures/Client.js');
const credentials = require('../../credentials.json');

client.on('ready', () => {
  console.log('I have connected: Ready to serve ' + client.guilds.size + ' servers with ' + client.users.size + ' members! Prefix: ' + credentials.prefix + '.');

  client.user.setGame('on ' + client.guilds.size + ' servers | ' + credentials.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});