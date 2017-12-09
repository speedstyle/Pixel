const patron = require('patron.js');

class SetMutedRole extends patron.Command {
  constructor() {
    super({
      names: ['setmutedrole', 'setmuterole', 'setmute', 'setmuted'],
      groupName: 'administration',
      description: 'Sets the muted role.',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Muted',
          preconditions: ['hierarchy'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.muted': args.role.id } });

    return text.reply('You have successfully set the muted role to ' + args.role + '.');
  }
}

module.exports = new SetMutedRole();
