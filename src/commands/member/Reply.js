const { Command } = require('patron.js');

class Reply extends Command {
  constructor() {
    super({
      names: ['reply'],
      groupName: 'member',
      description: 'Replies with a Message.',
      guildOnly: false
    });
  }

  run(msg) {
    return msg.channel.send('Hi, I\'m awake!');
  }
}

module.exports = new Reply();