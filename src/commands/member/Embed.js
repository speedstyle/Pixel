const { Command, Argument } = require('patron.js');
const { RichEmbed } = require('discord.js');

class Embed extends Command {
  constructor() {
    super({
      names: ['embed'],
      groupName: 'member',
      description: 'Embeds the text you provide.',
      guildOnly: false,
      args: [
        new Argument({
          key: 'text',
          name: 'text',
          type: 'string',
          example: 'This looks cool',
          remainder: true
        })
      ]
    });
  }

  run(msg, args) {
    const embed = new RichEmbed()
      .setDescription(args.text)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL)
      .setColor(0x00AE86)
      .setTimestamp();

    return msg.channel.send({ embed });
  }
}

module.exports = new Embed();