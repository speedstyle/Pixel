const { Command } = require('discord.js-commando');

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['boot'],
      group: 'moderator',
      memberName: 'kick',
      description: 'Kicks a member',
      examples: ['kick Shelby'],
      clientPermissions: ['KICK_MEMBERS'],
      args: [
        {
          key: 'member',
          prompt: 'Who would you like to kick?',
          type: 'member'
        },
        {
          key: 'reason',
          type: 'string',
          prompt: '',
          default: ''
        }
      ]
    });
  }

  async run(msg, args) {
    if (args.member.kickable === false) {
      return msg.say('I cannot kick ' + args.member.user.tag + '.');
    }

    await args.member.kick(args.reason.length === 0 ? '' : args.reason);

    return msg.say('Successfully kicked ' + args.member.user.tag + '.' + (args.reason.length === 0 ? '' : '\nReason: ' + args.reason));
  }
}

module.exports = Kick;
