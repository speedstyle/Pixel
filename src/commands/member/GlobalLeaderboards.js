const { Command } = require('patron.js');
const utility = require('../../utility/');

class GlobalLeaderboards extends Command {
  constructor() {
    super({
      names: ['globalleaderboards', 'globallb', 'globalhighscores', 'globalhighscore', 'globalleaderboard'],
      groupName: 'member',
      description: 'View the most active members globally.'
    });
  }

  async run(msg, args, text) {
    const users = await msg.client.db.globalUserRepo.findMany();

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

    return text.send(message, { title: 'The Most Active Members Globally' });
  }
}

module.exports = new GlobalLeaderboards();
