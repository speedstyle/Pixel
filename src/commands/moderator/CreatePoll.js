const { Command, Argument } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');
const utility = require('../../utility/');

class CreatePoll extends Command {
  constructor() {
    super({
      names: ['createpoll', 'makepoll'],
      groupName: 'member',
      description: 'Create a poll.',
      args: [
        new Argument({
          name: 'poll name',
          key: 'name',
          type: 'string',
          example: 'is john gay',
          preconditions: [{ name: 'characterlimit', options: { limit: utility.Constants.polls.maxChar } }],
        }),
        new Argument({
          name: 'choices',
          key: 'choices',
          type: 'string',
          example: 'yes~no~maybe'
        }),
        new Argument({
          name: 'days to last',
          key: 'days',
          type: 'float',
          example: '4',
          defaultValue: 1
        }),
        new Argument({
          name: 'elder only',
          key: 'eldersOnly',
          type: 'bool',
          example: 'true',
          defaultValue: false
        }),
        new Argument({
          name: 'mods only',
          key: 'modsOnly',
          type: 'bool',
          example: 'false',
          defaultValue: false,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const poll = await msg.client.db.pollRepo.findOne( { $and: [{ guildId: msg.guild.id }, { name: args.name }] } );
    const days = utility.Number.daysToMs(args.days);
    const choices = args.choices.split('~');

    if (poll !== null) {
      return text.sendError('There\'s already a poll with this name.');
    } else if (args.modsOnly === true && ModerationService.getPermLevel(msg.dbGuild, msg.guild.member(msg.author)) === 0) {
      return text.sendError('Only moderator\'s may create moderator only polls.');
    } else if (choices.length > utility.Constants.polls.maxAnswers) {
      return text.sendError('You may not have more than ' + utility.Constants.polls.maxAnswers + ' answers on your poll.');
    }

    for (let i = 0; i < choices.length; i++) {
      if (choices[i + 1] === choices[i]) {
        return text.sendError('You may not have multiple choices that are identical.');
      } else if (choices[i].length > utility.Constants.polls.maxAnswerChar) {
        return text.sendError('You may not have more than ' + utility.Constants.polls.maxAnswerChar + ' characters in your answer.');
      }
    }

    const polls = await msg.client.db.pollRepo.findMany({ guildId: msg.guild.id });

    await msg.client.db.pollRepo.insertPoll(polls.length + 1, args.name, msg.author.id, msg.guild.id, days, args.eldersOnly, args.modsOnly);

    for (let i = 0; i < choices.length; i++) {
      const makeChoice = 'choices.' + choices[i];
      await msg.client.db.pollRepo.updatePoll(args.name, msg.author.id, msg.guild.id, { $set: { [makeChoice]: 0, } });
    }

    return text.reply('You\'ve successfully created a poll with the name ' + utility.String.boldify(args.name) + '.');
  }
}

module.exports = new CreatePoll();
