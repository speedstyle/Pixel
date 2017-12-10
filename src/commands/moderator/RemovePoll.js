const { Command, Argument } = require('patron.js');
const utility = require('../../utility');

class RemovePoll extends Command {
  constructor() {
    super({
      names: ['removepoll'],
      groupName: 'member',
      description: 'Destroy your poll.',
      args: [
        new Argument({
          name: 'poll',
          key: 'poll',
          type: 'poll',
          example: 'fags',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    if (msg.author.id !== args.poll.creatorId) {
      return text.sendError('You\'re not the creator of this poll.');
    }

    await msg.client.db.pollRepo.deletePoll(args.poll.name, args.poll.creatorId, msg.guild.id);
    return text.reply('Successfully destroyed your poll `' + utility.String.boldify(args.poll.name) + '`.');
  }
}

module.exports = new RemovePoll();
