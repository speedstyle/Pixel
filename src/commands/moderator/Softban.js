const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const ModerationService = require('../../services/ModerationService');
const util = require('../../utility');
const Constants = require('../../utility/Constants');

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
          preconditions: ['bannable'],
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

  async run(msg, args, text) {
    await msg.guild.ban(args.user, { reason: args.reason.length === 0 ? '' : args.reason, days: args.days });
    await msg.guild.unban(args.user);
    const formattedHours = args.days + ' day' + (args.days === 1 ? '' : 's');    
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Soft-ban', util.Constants.embedColors.mute, args.reason, msg.author, args.member.user, 'Number of days', formattedHours);
    return text.send('Successfully softbanned ' + args.user.tag + '.' + '\n**Messages Deleted**: ' + args.days + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Softban();