const { Command, Argument } = require('patron.js');
const ModerationService = require('../../services/ModerationService');
const Constants = require('../../utility/Constants.js');

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
          preconditions: ['kickable', 'nomoderator'],
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
    if (msg.guild.members.has(args.member.id)) {
      await ModerationService.tryInformUser(msg.guild, msg.author, 'kicked', args.member.user, args.reason);
    }

    await args.member.kick(args.reason);
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Kick', Constants.embedColors.kick, args.reason, msg.author, args.member.user);

    return text.send('Successfully kicked ' + args.member.user.tag + '.' + (args.reason.length === 0 ? '' : '\n**Reason**: ' + args.reason));
  }
}

module.exports = new Kick();