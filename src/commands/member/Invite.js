const { Command } = require('patron.js');

class Invite extends Command {
  constructor() {
    super({
      names: ['invite', 'botinvite', 'serverinvite', 'invitation'],
      groupName: 'member',
      description: 'Sends the bot invite link and server invite link.',
      guildOnly: false
    });
  }

  run(msg, args, text) {
    return text.send('**Bot invite:**\nhttps://discordapp.com/oauth2/authorize?client_id=377886472017149953&scope=bot&permissions=8\n**GitHub Repository:**\nhttps://github.com/LumiteDubbz/Pixel\n**Support Server invite link:**\nhttps://discord.me/pixelsupport', { footer: { icon: msg.client.user.displayAvatarURL, text: msg.client.user.username }});
  }
}

module.exports = new Invite();