const client = require('../structures/Client.js');
const text = require('../utility/Text');

client.on('guildCreate', guild => {
  client.user.setGame('on ' + client.guilds.size + ' servers', 'https://twitch.tv/lumitedubbz');

  if (guild.defaultChannel !== undefined) {
    return text.send('Hey there, I\'m Pixel. You can view all of my available commands by typing `p!help`.\nShould you need support, you can join **the official support server:** https://discord.me/pixelsupport\n**Report any issues here:** https://github.com/lumitedubbz/pixel/issues')
  }
});