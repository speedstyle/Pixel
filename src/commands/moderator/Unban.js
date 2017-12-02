const { Command, Argument } = require('patron.js');

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

  async run(msg, args) {
    await msg.guild.unban(args.user);

    return msg.channel.send('Successfully unbanned ' + args.user.tag + '.');
  }
}

module.exports = new Unban();