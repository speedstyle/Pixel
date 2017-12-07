const { Command } = require('patron.js');
const utility = require('../../utility');

class Statistics extends Command {
  constructor() {
    super({
      names: ['statistics', 'stats'],
      groupName: 'member',
      description: 'Statistics about the Pixel bot.',
      guildOnly: false
    });
  }

  async run(msg, args, text) {
    const uptime = utility.Number.msToTime(msg.client.uptime);

    await text.dmFields([
      'Authors', '`</LumiteDubbz>#7496\nDaf🎄#6059\nAssLey#0911\nLuner#0059`',
      'Framework', 'patron.js',
      'Memory', (process.memoryUsage().rss / 1048576).toFixed(2) + ' MB',
      'Servers', msg.client.guilds.size.toLocaleString(),
      'Users', msg.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
      'Uptime', 'Days: ' + uptime.days + '\nHours: ' + uptime.hours + '\nMinutes: ' + uptime.minutes
    ], { inline: true });

    if (msg.channel.type !== 'dm') {
      return text.reply('You have been DMed with all Pixel statistics!');
    }
  }
}

module.exports = new Statistics();