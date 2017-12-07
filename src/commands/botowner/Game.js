const { Command, Argument } = require('patron.js');
const credentials = require('../../../credentials.json');
const utility = require('../../utility/');

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
          example: 'with dank memes',
          preconditions: [{ name: 'characterlimit', options: { limit: utility.Constants.setgame.maxLength } }],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.user.setGame(args.game, 'https://twitch.tv/lumitedubbz');
    return text.reply('Successfully set game to ' + args.game + ' to change it again, type `' + credentials.prefix + 'game`.');
  }
}

module.exports = new Game();