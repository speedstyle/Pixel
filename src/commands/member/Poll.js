const patron = require('patron.js');
const utility = require('../../utility/');

class Poll extends patron.Command {
  constructor() {
    super({
      names: ['poll', 'findpoll'],
      groupName: 'moderator',
      description: 'Finds a poll.',
      args: [
        new patron.Argument({
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
    let choices = '';
    const timeLeft = utility.Number.msToTime((args.poll.length - (Date.now() - args.poll.createdAt)));

    if (args.poll.creatorId !== null && args.poll.creatorId !== undefined) {
      const getCreator = await msg.guild.members.get(args.poll.creatorId);
      creator = getCreator.user.tag;
    } else {
      creator = 'Nobody';
    }

    for (const key in args.poll.choices) {
      choices += key + ': ' + args.poll.choices[key] + ',\n';
    }

    return text.send('**Index:** ' + args.poll.index + '\n**Creator:** ' + creator + '\n**Answers:** \n' + choices.substring(0, choices.length - 2) + '\n**Ending:** Days: ' + timeLeft.days + ', Hours: ' + timeLeft.hours + ', Minutes: ' + timeLeft.minutes + ', Seconds: ' + timeLeft.seconds + '\n**Elder Only:** ' + (args.poll.elderOnly === true ? 'Yes' : 'No') + '\n**Mod Only:** ' + (args.poll.modOnly === true ? 'Yes' : 'No'), { title: args.poll.name });
  }
}

module.exports = new Poll();
