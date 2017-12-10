const { Command, Argument } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');
const Constants = require('../../utility/Constants.js');

class Unban extends Command {
  constructor() {
    super({
      names: ['unban'],
      groupName: 'moderator',
      description: 'Unbans a user',
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        new Argument({
          key: 'user',
          name: 'user',
          type: 'banneduser',
          example: 'b1nzy#1337'
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.guild.unban(args.user);
    await ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Un-ban', Constants.embedColors.unban, args.reason, msg.author, args.user);
    return text.send('Successfully unbanned ' + args.user.tag + '.');
  }
}

module.exports = new Unban();