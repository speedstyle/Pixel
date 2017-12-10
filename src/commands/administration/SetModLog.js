const { Command, Argument } = require('patron.js');

class SetModLog extends Command {
  constructor() {
    super({
      names: ['setmodlog', 'modlog', 'logs', 'setmodlog', 'setmodlogs', 'setlog', 'setlogs'],
      groupName: 'administration',
      description: 'Sets the mod log channel.',
      args: [
        new Argument({
          name: 'channel',
          key: 'channel',
          type: 'textchannel',
          example: 'Mod Log',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.modLog': args.channel.id } });

    return text.reply('You have successfully set the mod log channel to ' + args.channel + '.');
  }
}

module.exports = new SetModLog();
