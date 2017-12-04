const { Command } = require('patron.js');
const { RichEmbed } = require('discord.js');
const utility = require('../../utility');

class Ping extends Command {
  constructor() {
    super({
      names: ['ping', 'latency'],
      groupName: 'member',
      description: 'Shows the heartbeat ping and message ping',
      guildOnly: false
    });
  }

  async run(msg, args, text) {
    const sent = await text.send('Pinging...');
    const embed = new RichEmbed()
    .setColor(utility.Random.arrayElement(utility.Constants.embedColors.defaults))
    .setTitle('Ping')
    .setTimestamp()
    .setDescription('**Heartbeat**: ' + Math.round(msg.client.ping) + ' ms.\n**Message Ping**: ' + Math.round(sent.createdTimestamp - msg.createdTimestamp) + ' ms.');

    return sent.edit({ embed });
  }
}

module.exports = new Ping();