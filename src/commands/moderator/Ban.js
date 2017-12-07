const { Command, Argument } = require('patron.js');
const utility = require('../../utility');

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
          preconditions: ['bannable'],
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

  async run(msg, args, text) {
    await msg.guild.ban(args.user, { reason: args.reason.length === 0 ? '' : args.reason });

    return text.send('Successfully banned ' + args.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Ban();