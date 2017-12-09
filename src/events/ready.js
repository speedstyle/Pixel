const client = require('../structures/Client.js');

client.on('ready', () => {
  console.log('I have connected: Ready to serve ' + client.guilds.size + ' servers with ' + client.users.size + ' members!');

  client.user.setGame('on ' + client.guilds.size + ' servers', 'https://twitch.tv/lumitedubbz');
});