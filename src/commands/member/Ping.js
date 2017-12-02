const { Command } = require('patron.js');

class Ping extends Command {
  constructor() {
    super({
      names: ['ping', 'latency'],
      groupName: 'member',
      description: 'Shows the heartbeat ping and message ping',
      guildOnly: false
    });
  }

  async run(msg) {
    const sent = await msg.channel.send('Pinging...');

    return sent.edit('**Ping**:\n**Heartbeat**: ' + Math.round(msg.client.ping) + ' ms.\n**Message**: ' + Math.round(sent.createdTimestamp - msg.createdTimestamp) + ' ms.');
  }
}

module.exports = new Ping();