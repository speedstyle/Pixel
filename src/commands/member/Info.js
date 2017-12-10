const patron = require('patron.js');

class Info extends patron.Command {
  constructor() {
    super({
      names: ['rank', 'level', 'info', 'xp'],
      groupName: 'member',
      description: 'View the info of anyone.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'lmaoggnerds#8321',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = msg.author.id === args.member.id ? msg.dbUser : await db.userRepo.getUser(args.member.id, msg.guild.id);
    const sortedUsers = (await msg.client.db.userRepo.findMany({ guildId: msg.guild.id })).sort((a, b) => b.level - a.level);

    return text.send('**Level:** ' + dbUser.level + '\n**XP:** ' + dbUser.xp + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1), { title: args.member.user.tag + '\'s Information', footer: { text: 'Xp Needed For Next Level: ' + dbUser.xpNeeded } });
  }
}

module.exports = new Info();
