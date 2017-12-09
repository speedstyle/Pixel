const patron = require('patron.js');

class DisableWelcome extends patron.Command {
  constructor() {
    super({
      names: ['disablewelcome', 'deletewelcome', 'deletewelcomemessage', 'clearwelcome', 'clearwelcomemessage'],
      groupName: 'administration',
      description: 'Deletes the welcome message.'
    });
  }

  async run(msg, args, text) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.welcomeMessage': null } });

    return text.reply('You have successfully disabled this server\'s welcome message.');
  }
}

module.exports = new DisableWelcome();
