const { Command, Argument } = require('patron.js');
const utility = require('../../utility/');

class Poll extends Command {
  constructor() {
    super({
      names: ['poll', 'findpoll'],
      groupName: 'member',
      description: 'Finds a poll.',
      args: [
        new Argument({
          name: 'poll',
          key: 'poll',
          type: 'poll',
          example: '4',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    let creator = '';
    let choices = '```';
    const timeLeft = utility.Number.msToTime((args.poll.length - (Date.now() - args.poll.createdAt)));

    if (args.poll.creatorId !== null && args.poll.creatorId !== undefined) {
      const getCreator = await msg.guild.members.get(args.poll.creatorId);
      creator = getCreator.user.tag;
    } else {
      creator = 'Nobody';
    }

    let position = '1';

    for (const key in args.poll.choices) {
      choices += (position++) + '. ' + key + ': ' + args.poll.choices[key] + ',\n';
    }

    return text.send('**Index:** ' + args.poll.index + '\n**Creator:** ' + creator + '\n**Answers:** \n' + choices.substring(0, choices.length - 2) + '```' + '\n**Ending:** Days: ' + timeLeft.days + ', Hours: ' + timeLeft.hours + ', Minutes: ' + timeLeft.minutes + ', Seconds: ' + timeLeft.seconds, { title: args.poll.name, footer: { text: (args.poll.elderOnly === true && args.poll.modOnly !== true ? 'Elder Only' : '') + (args.poll.modOnly === true && args.poll.elderOnly !== true ? 'Mod Only' : '') + (args.poll.modOnly === true && args.poll.elderOnly === true ? 'Elder Only, & Mod Only' : '') } });
  }
}

module.exports = new Poll();
