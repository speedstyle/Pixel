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
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  run(msg, args, text) {
    if (utility.String.isNullOrWhiteSpace(args.command)) {
      const groups = msg.client.registry.groups;
      let allCommands = 'Here\'s all of the commands available:\n';

      for (let i = 0; i < groups.length; i++) {
        const groupCommands = groups[i].commands;
        allCommands += utility.String.boldify(utility.String.upperFirstChar(groups[i].name)) + ': ';

        for (let k = 0; k < groupCommands.length; k++) {
          allCommands += utility.String.upperFirstChar(groupCommands[k].names[0]) + ', '
        }

        allCommands = allCommands.substring(0, allCommands.length - 2);
        allCommands += '\n';
      }

      return text.send(allCommands);
    }

    const lowerInput = args.command.toLowerCase();
    const command = msg.client.registry.commands.find(c => c.names.includes(lowerInput));

    if (command === undefined) {
      return text.sendError('This command doesn\'t exist.');
    }

    const aliases = utility.String.list(command.names.map(i => utility.String.upperFirstChar(i)), '`', '`');
    let commandInfo = (aliases.length === 1 ? '' : '\n**Aliases**: ' + aliases) + '\n**Description**: `' + command.description +  '`\n**Usage**: `' + credentials.prefix + command.getUsage() + '`\n**Example**: `' + credentials.prefix + command.getExample() + '`';

    return text.send(commandInfo, { title: utility.String.upperFirstChar(command.names[0]) + ' - ' + utility.String.upperFirstChar(command.group.name) });
  }
}

module.exports = new Help();