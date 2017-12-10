const { Command, Argument } = require('patron.js');

class AddModRole extends Command {
  constructor() {
    super({
      names: ['addmodrole', 'addmod', 'setmod'],
      groupName: 'owners',
      description: 'Add a mod role.',
      args: [
        new Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Moderator'
        }),
        new Argument({
          name: 'permissionLevel',
          key: 'permissionLevel',
          type: 'float',
          example: '2',
          default: 1
        })
      ]
    });
  }

  async run(msg, args, text) {
    if (args.permissionLevel < 1 || args.permissionLevel > 3) {
      return text.sendError('Permission levels:\nModerator: 1\nAdministrator: 2\nOwner: 3');
    } else if (msg.dbGuild.roles.mod.some((role) => role.id === args.role.id)) {
      return text.sendError('This moderation role has already been set.');
    }

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, new msg.client.db.updates.Push('roles.mod', { id: args.role.id, permissionLevel: args.permissionLevel }));

    return text.reply('You have successfully added the mod role ' + args.role + ' with a permission level of ' + args.permissionLevel + '.');
  }
}

module.exports = new AddModRole();
