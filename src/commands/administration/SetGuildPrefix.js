const { Command, Argument } = require('patron.js');
const utility = require('../../utility/');

class SetGuildPrefix extends Command {
  constructor() {
    super({
      names: ['setprefix', 'setguildpefix', 'setguildsprefix'],
      groupName: 'administration',
      description: 'Sets the guild\'s prefix.',
      args: [
        new Argument({
          name: 'prefix',
          key: 'prefix',
          type: 'string',
          example: '$',
          preconditions: [{ name: 'characterlimit', options: { limit: utility.Constants.guildSettings.prefixLength } }],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.prefix': args.prefix } });

    return text.reply('You\'ve successfully set the guild\'s prefix to `' + args.prefix + '`.');
  }
}

module.exports = new SetGuildPrefix();
