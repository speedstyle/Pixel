const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const ModerationService = require('../../services/ModerationService')

class Mute extends Command {
  constructor() {
    super({
      names: ['mute'],
      groupName: 'moderator',
      description: 'Mute any member.',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          preconditions: ['nomoderator'],
          example: '"Jack Kannoff#0711"'
        }),
        new Argument({
          name: 'quantity of hours',
          key: 'hours',
          type: 'float',
          example: '48',
          defaultValue: 24
        }),
        new Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'oops',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    if (msg.dbGuild.roles.muted === null) {
      return text.sendError('You must set the muted role with the `' + msg.dbGuild.settings.prefix + 'setmute @Role` command before you can mute users.');
    } else if (args.member.roles.has(msg.dbGuild.roles.muted)) {
      return text.sendError('This member is already muted.');
    }

    const role = msg.guild.roles.get(msg.dbGuild.roles.muted);

    if (role === undefined) {
      return text.sendError('The set muted role has been deleted. Please set a new one with the `' + msg.dbGuild.settings.prefix + 'setmute Role` command.');
    }

    const formattedHours = args.hours + ' hour' + (args.hours === 1 ? '' : 's');

    await args.member.addRole(role);
    await text.send('You have successfully muted ' + args.member.user.tag + ' for ' + formattedHours + '.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'muted', args.member.user, args.reason);
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Mute', utility.Constants.embedColors.mute, args.reason, msg.author, args.member.user, 'Length', formattedHours);
    return msg.client.db.muteRepo.insertMute(args.member.id, msg.guild.id, utility.Number.hoursToMs(args.hours));
  }
}

module.exports = new Mute();