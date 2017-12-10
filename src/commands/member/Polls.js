const { Command } = require('patron.js');

class Polls extends Command {
  constructor() {
    super({
      names: ['polls'],
      groupName: 'member',
      description: 'Finds all polls in server.'
    });
  }

  async run(msg, args, text) {
    const polls = (await msg.client.db.pollRepo.findMany({ guildId: msg.guild.id })).sort((a, b) => b.index - a.index);

    if (polls.length === 0) {
      return text.sendError('There\'s no polls on this server.');
    }

    let message = '';

    for (let i = 0; i < polls.length; i++) {
      message += polls[i].index + '. ' + polls[i].name + '\n';
      if (i === 20) {
        await msg.author.dmFields(['Polls For Server: ' + msg.guild.name, '```\n' + message + '```'], false);
        message = '';
      }
    }

    await text.dmFields(['Polls For Server: ' + msg.guild.name, '```\n' + message + '```'], false);
    return text.reply('You have been DMed with all ' + msg.guild.name + ' polls.');
  }
}

module.exports = new Polls();
