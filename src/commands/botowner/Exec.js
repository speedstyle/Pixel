const { Command, Argument } = require('patron.js');
const { exec } = require('child_process');
const utility = require('../../utility');

class Exec extends Command {
  constructor() {
    super({
      names: ['exec'],
      groupName: 'botowner',
      description: 'Executes batch commands',
      guildOnly: false,
      args: [
        new Argument({
          key: 'command',
          name: 'command',
          type: 'string',
          example: 'cd',
          remainder: true
        })
      ]
    });
  }

  run(msg, args, text) {
    exec(args.command, (error, stdout, stderr) => {
      if (error || stderr) {
        return text.sendError('```bat\n' + (error || stderr) + '```', false);
      }

      return text.send('**Successfully Executed**```bat\n' + args.command + '```' + (utility.String.isNullOrWhiteSpace(stdout) ? '' : '**Output**' + (stdout.length > 2048 ? '\nOutput is too long to show.' : '```bat\n' + stdout.replace(process.env.USERNAME, 'USER') + '```')));
    });
  }
}

module.exports = new Exec();