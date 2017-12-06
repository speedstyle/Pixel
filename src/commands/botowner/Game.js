const { Command, Argument } = require('patron.js');
const client = require('../../structures/Client.js');
const credentials = require('../../../credentials.json')

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
                    remainder: true
                })
            ]
        });
    }
    
    run(msg, args, text) {
        const options = {
            timestamp: true,
            author: {
                name: 'Game Commmand',
                icon: msg.author.displayAvatarURL
            }
        };

        if(args.game.length > 128) {
            return text.sendError('I cannot set my game to that because it is over 128 characters.')
        }
        client.user.setGame(args.game, 'https://twitch.tv/lumitedubbz')
        return text.reply(`successfully set my game to ${args.game}! To change it again, type \`${credentials.prefix}game\``)
    }
}

module.exports = new Game();
