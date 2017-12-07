const { Command, Argument } = require('patron.js');
const utility = require('../../utility');

class Kick extends Command {
  constructor() {
    super({
      names: ['kick', 'boot'],
      groupName: 'moderator',
      description: 'Kicks a member',
      clientPermissions: ['KICK_MEMBERS'],
      args: [
        new Argument({
          key: 'member',
          name: 'member',
          type: 'member',
          preconditions: ['kickable'],
          example: 'Savannah'
        }),
        new Argument({
          key: 'reason',
          name: 'reason',
          type: 'string',
          example: 'Totally an accident',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await args.member.kick(args.reason.length === 0 ? '' : args.reason);

    return text.send('Successfully kicked ' + args.member.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Kick();