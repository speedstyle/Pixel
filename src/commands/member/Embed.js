const { Command, Argument } = require('patron.js');

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

  run(msg, args, text) {
    const options = {
      timestamp: true,
      author: {
        name: msg.author.username,
        icon: msg.author.displayAvatarURL
      }
    };

    return text.send(args.text, options)
  }
}

module.exports = new Embed();