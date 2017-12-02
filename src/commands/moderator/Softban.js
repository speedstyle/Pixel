const { Command, Argument } = require('patron.js');

class Softban extends Command {
  constructor() {
    super({
      names: ['softban'],
      groupName: 'moderator',
      description: 'Softbans a user',
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        new Argument({
          key: 'user',
          name: 'user',
          type: 'user',
          example: 'Cock#1525'
        }),
        new Argument({
          key: 'days',
          name: 'days',
          type: 'int',
          example: '7',
          preconditions: [{ name: 'between', options: { minimum: 1, maximum: 7 } }],
          defaultValue: 1
        }),
        new Argument({
          key: 'reason',
          name: 'reason',
          type: 'string',
          example: 'image raid',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.user.bannable === false) {
      return msg.channel.send('I cannot softban ' + args.user.tag + '.');
    }

    await msg.guild.ban(args.user, { reason: args.reason.length === 0 ? '' : args.reason, days: args.days });
    await msg.guild.unban(args.user);

    return msg.channel.send('Successfully softbanned ' + args.user.tag + '.' + '\n**Messages Deleted**: ' + args.days + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Softban();