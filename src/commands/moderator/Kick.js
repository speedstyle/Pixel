const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const ModerationService = require('../../services/ModerationService');
const util = require('../../utility');
const Constants = require('../../utility/Constants');

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
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Kick', util.Constants.embedColors.kick, args.reason, msg.author, args.member.user);
    return text.send('Successfully kicked ' + args.member.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Kick();