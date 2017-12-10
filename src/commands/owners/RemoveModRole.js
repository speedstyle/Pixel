const { Command, Argument } = require('patron.js');

class RemoveModRole extends Command {
  constructor() {
    super({
      names: ['removemodrole', 'removemod'],
      groupName: 'owners',
      description: 'Remove a mod role.',
      args: [
        new Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Moderator',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    if (msg.dbGuild.roles.mod.some((role) => role.id === args.role.id) === false) {
      return text.sendError('You may not remove a moderation role that has no been set.');
    }

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, new msg.client.db.updates.Pull('roles.mod', { id: args.role.id }));

    return text.reply('You have successfully removed the mod role ' + args.role + '.');
  }
}

module.exports = new RemoveModRole();
