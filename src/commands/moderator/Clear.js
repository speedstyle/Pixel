const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const ModerationService = require('../../services/ModerationService.js');

class Clear extends Command {
  constructor() {
    super({
      names: ['clear', 'prune', 'purge'],
      groupName: 'moderator',
      description: 'Clear up to messages in any text channel.',
      cooldown: 1000,
      botPermissions: ['MANAGE_MESSAGES'],
      args: [
        new Argument({
          name: 'quantity',
          key: 'quantity',
          type: 'float',
          example: '5'
        }),
        new Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'one of the apples was spamming like an orange.',
          defaultValue: ''
        }),
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Luner#0059',
          defaultValue: null,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const messages = await msg.channel.fetchMessages({ limit: args.quantity, before: msg.id });

    if (args.member !== null) {
      const newMessages = await messages.filter(m => m.author.id === args.member.id);

      await msg.channel.bulkDelete(newMessages);
    } else {
      await msg.channel.bulkDelete(messages);
    }

    await msg.delete();

    const reply = await text.reply('You have successfully deleted ' + args.quantity + ' messages.');

    ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Clear', utility.Constants.embedColors.clear, args.reason, msg.author, null, 'Quantity', args.quantity);

    return reply.delete(3000);
  }
}

module.exports = new Clear();
