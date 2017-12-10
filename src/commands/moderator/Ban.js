const { Command, Argument } = require('patron.js');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService');

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
          preconditions: ['bannable', 'nomoderator'],
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
    if (msg.guild.members.has(args.user.id)) {
      await ModerationService.tryInformUser(msg.guild, msg.author, 'banned', args.user, args.reason);
    }

    await msg.guild.ban(args.user, args.reason);
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Ban', Constants.embedColors.ban, args.reason, msg.author, args.user);

    return text.send('Successfully banned ' + args.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Ban();