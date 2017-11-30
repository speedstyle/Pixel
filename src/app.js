const { CommandoClient } = require('discord.js-commando');  // Dependency
const path = require('path'); // Dependency
const credentials = require('../credentials.json');  // The Credentials file
const self = new CommandoClient({ // Now, we introduce our new Commando Client. you can rename "self" to anything; "client", "bot" or even "banana". Just be sure to rename each instance of "self" to your chosing
  commandPrefix: credentials.prefix, // This is the prefix for each command. The default that I set it to is "%". You can change it from the default in the "credentials.json" file. */
  owner: credentials.ownerID, // This is your user ID, this is also taken from the credentials file.
  disableEveryone: true, // This stops people from being able to @everyone, using your bot.
  unknownCommandResponse: false
});

self.registry
  .registerDefaultTypes()
  .registerGroups([
    ['member', 'Standard member group'], // The first 'quotation' is the group name. The second is the group definition.
    ['moderator', 'Moderator in the server']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

self.on('ready', () => {
  console.log('I have connected: Ready to serve ' + self.guilds.size + ' servers with ' + self.users.size + ' members! Prefix: ' + credentials.prefix + '.');

  self.user.setGame('on ' + self.guilds.size + ' servers | ' + credentials.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});

self.on('guildCreate', (guild) => {
  self.user.setGame('on ' + self.guilds.size + ' servers | ' + credentials.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});

self.on('guildDelete', (guild) => {
  self.user.setGame('on ' + self.guilds.size + ' servers | ' + credentials.prefix + 'help', 'https://twitch.tv/lumitedubbz');
});

self.login(credentials.token);


process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:\n' + err.stack);
});