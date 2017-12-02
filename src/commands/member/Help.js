const { Command, Argument } = require('patron.js');
const utility = require('../../utility');
const credentials = require('../../../credentials.json');

class Help extends Command {
  constructor() {
    super({
      names: ['help', 'command'],
      groupName: 'member',
      description: 'Shows information on a command',
      guildOnly: false,
      args: [
        new Argument({
          key: 'command',
          name: 'command',
          type: 'string',
          example: 'help',
          remainder: true
        })
      ]
    });
  }

  run(msg, args) {
    const lowerInput = args.command.toLowerCase();
    const command = msg.client.registry.commands.find(c => c.names.includes(lowerInput));

    if (command === undefined) {
      return msg.channel.send('This command doesn\'t exist.');
    }

    const aliases = utility.String.list(command.names.map(i => utility.String.upperFirstChar(i)), '`', '`');
    let commandInfo = utility.String.upperFirstChar(command.names[0]) + ' - ' + utility.String.upperFirstChar(command.group.name) + (aliases.length === 1 ? '' : '\n**Aliases**: ' + aliases) + '\n**Description**: `' + command.description +  '`\n**Usage**: `' + credentials.prefix + command.getUsage() + '`\n**Example**: `' + credentials.prefix + command.getExample() + '`';

    return msg.channel.send(commandInfo);
  }
}

module.exports = new Help();