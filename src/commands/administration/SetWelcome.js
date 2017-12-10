const { Command, Argument } = require('patron.js');

class SetWelcome extends Command {
  constructor() {
    super({
      names: ['setwelcome', 'setwelcomemessage', 'welcome', 'addwelcome'],
      groupName: 'administration',
      description: 'Sets the welcome message.',
      args: [
        new Argument({
          name: 'message',
          key: 'message',
          type: 'string',
          example: 'Hey! Welcome to our server!',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.welcomeMessage': args.message } });

    return text.reply('You have successfully set the welcome message to "' + args.message + '".');
  }
}

module.exports = new SetWelcome();
