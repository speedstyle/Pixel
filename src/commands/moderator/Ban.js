const { Command, Argument } = require('patron.js');

class Ban extends Command {
  constructor() {
    super({
      names: ['ban', 'hammer'],
      groupName: 'moderator',
      description: 'Bans a user',
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        new Argument({
          key: 'user',
          name: 'user',
          type: 'user',
          example: 'Cock#1525'
        }),
        new Argument({
          key: 'reason',
          name: 'reason',
          type: 'string',
          example: 'Why not',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.user.bannable === false) {
      return msg.channel.send('I cannot ban ' + args.user.tag + '.');
    }

    await msg.guild.ban(args.user, { reason: args.reason.length === 0 ? '' : args.reason });

    return msg.channel.send('Successfully banned ' + args.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Ban();