const { Command } = require('patron.js');
const utility = require('../../utility/');

class Leaderboards extends Command {
  constructor() {
    super({
      names: ['leaderboards', 'lb', 'highscores', 'highscore', 'leaderboard'],
      groupName: 'member',
      description: 'View the most active members.'
    });
  }

  async run(msg, args, text) {
    const users = await msg.client.db.userRepo.findMany({ guildId: msg.guild.id });

    users.sort((a, b) => b.xp - a.xp);

    let message = '';

    for (let i = 0; i < users.length; i++) {
      if (i + 1 > utility.Constants.leaderboardCap) {
        break;
      }

      const user = msg.client.users.get(users[i].userId);

      if (user === undefined) {
        continue;
      }

      message += (i + 1) + '. ' + utility.String.boldify(user.tag) + ': **XP:** ' + users[i].xp + ' **Level:** ' + users[i].level + '\n';
    }

    if (utility.String.isNullOrWhiteSpace(message) === true) {
      return text.sendError('There is nobody on the leaderboards.');
    }

    return text.send(message, { title: 'The Most Active Members' });
  }
}

module.exports = new Leaderboards();
