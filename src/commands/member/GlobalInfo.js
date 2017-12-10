const { Command, Argument, ArgumentDefault } = require('patron.js');
const XpService = require('../../services/XpService.js');

class GlobalInfo extends Command {
  constructor() {
    super({
      names: ['globalrank', 'globallevel', 'globalinfo', 'globalxp'],
      groupName: 'member',
      description: 'View the global info of anyone.',
      args: [
        new Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          defaultValue: ArgumentDefault.Author,
          example: 'lmaoggnerds#8321',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = msg.author.id === args.user.id ? msg.globalDbUser : await msg.client.db.userRepo.getUser(args.user.id, msg.guild.id);
    const sortedUsers = (await msg.client.db.globalUserRepo.findMany()).sort((a, b) => b.level - a.level);
    const neededXp = await XpService.getGlobalNeededXp(msg.dbUser);

    return text.send('**Level:** ' + dbUser.level + '\n**XP:** ' + dbUser.xp + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1), { title: args.user.tag + '\'s Information', footer: { text: (neededXp === 'max level' ? 'You\'re max level!' : 'Xp Needed For Next Level: ' + neededXp) } });
  }
}

module.exports = new GlobalInfo();
