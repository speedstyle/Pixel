const { Command, Argument, ArgumentDefault } = require('patron.js');
const XpService = require('../../services/XpService.js');

class Info extends Command {
  constructor() {
    super({
      names: ['rank', 'level', 'info', 'xp'],
      groupName: 'member',
      description: 'View the info of anyone.',
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: ArgumentDefault.Member,
          example: 'lmaoggnerds#8321',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = msg.author.id === args.member.id ? msg.dbUser : await msg.client.db.userRepo.getUser(args.member.id, msg.guild.id);
    const sortedUsers = (await msg.client.db.userRepo.findMany({ guildId: msg.guild.id })).sort((a, b) => b.level - a.level);
    const neededXp = await XpService.getNeededXp(msg.dbUser);

    return text.send('**Level:** ' + dbUser.level + '\n**XP:** ' + dbUser.xp + '\n**Skill Points:** ' + dbUser.skillPoints + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1), { title: args.member.user.tag + '\'s Information', footer: { text: (neededXp === 'max level' ? 'You\'re max level!' : 'Xp Needed For Next Level: ' + neededXp) } });
  }
}

module.exports = new Info();
