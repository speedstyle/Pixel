const { Command } = require('discord.js-commando');

class Reply extends Command {
  constructor(client) {
    super(client, {
      name: 'reply',
      group: 'member',
      memberName: 'reply',
      description: 'Replies with a Message.',
      examples: ['reply']
    });
  }

  run(msg) {
    return msg.say('Hi, I\'m awake!');
  }
}

module.exports = Reply;