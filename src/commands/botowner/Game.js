const { Command, Argument } = require('patron.js');
const utility = require('../../utility');

class Game extends Command {
  constructor() {
    super({
      names: ['game', 'setgame', 'gameset'],
      groupName: 'botowner',
      description: 'Changes the bot\'s game.',
      guildOnly: false,
      args: [
        new Argument({
          key: 'game',
          name: 'game',
          type: 'string',
          example: 'with dank memes.',
          preconditions: [{ name: 'characterlimit', options: { limit: utility.Constants.setgame.maxLength } }],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.user.setGame(args.game);

    return text.reply('successfully set my game to ' + args.game + '! To change it again, type ' + msg.client.config.prefix + 'game command.');
  }
}

module.exports = new Game();