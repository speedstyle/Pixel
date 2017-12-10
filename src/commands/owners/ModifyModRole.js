const { Command, Argument } = require('patron.js');

class ModifyModRole extends Command {
  constructor() {
    super({
      names: ['configuremodrole', 'modifymodrole'],
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
    }

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, new msg.client.db.updates.Push('roles.mod', { id: args.role.id, permissionLevel: args.permissionLevel }));

    return text.reply('You have successfully modify\'d the mod role ' + args.role + ' with a permission level of ' + args.permissionLevel + '.');
  }
}

module.exports = new ModifyModRole();
