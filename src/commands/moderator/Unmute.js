const { Command, Argument } = require('patron.js');
const ModerationService = require('../../services/ModerationService');
const Constants = require('../../utility/Constants');

class Unmute extends Command {
  constructor() {
    super({
      names: ['unmute'],
      groupName: 'moderator',
      description: 'Unmute any member.',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: '"Jimmy Fallon#3636"'
        }),
        new Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          defaultValue: '',
          example: 'gave me succ',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    if (msg.dbGuild.roles.muted === null) {
      return text.sendError('You must set a muted role with the `' + msg.dbGuild.settings.prefix + 'setmute @Role` command before you can unmute users.');
    } else if (args.member.roles.has(msg.dbGuild.roles.muted) === false) {
      return text.sendError('This user is not muted.');
    }

    const role = msg.guild.roles.get(msg.dbGuild.roles.muted);

    if (role === undefined) {
      return text.sendError('The set muted role has been deleted. Please set a new one with the `' + msg.client.config.prefix + 'setmute Role` command.');
    }

    await args.member.removeRole(role);
    await ModerationService.tryInformUser(msg.guild, msg.author, 'unmuted', args.member.user, args.reason);
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Un-mute', Constants.embedColors.unmute, args.reason, msg.author, args.member.user);
    return text.send('You have successfully unmuted ' + args.member.user.tag + '.');
  }
}

module.exports = new Unmute();