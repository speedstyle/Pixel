const { Command } = require('discord.js-commando');

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['hammer'],
      group: 'moderator',
      memberName: 'ban',
      description: 'bans a member',
      examples: ['ban me'],
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        {
          key: 'member',
          prompt: 'Who would you like to ban?',
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
    if (args.member.bannable === false) {
      return msg.say('I cannot ban ' + args.member.user.tag + '.');
    }

    await msg.guild.ban(args.member, { reason: args.reason.length === 0 ? '' : args.reason });

    return msg.say('Successfully banned ' + args.member.user.tag + '.' + (args.reason.length === 0 ? '' : '\nReason: ' + args.reason));
  }
}

module.exports = Ban;