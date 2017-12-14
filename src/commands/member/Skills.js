const { Command, Argument, ArgumentDefault } = require('patron.js');
const utility = require('../../utility');

class Skills extends Command {
  constructor() {
    super({
      names: ['skills'],
      groupName: 'member',
      description: 'View the skills of anyone.',
      args: [
        new Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: ArgumentDefault.Member,
          example: 'fagtron#1324',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, text) {
    const dbUser = await msg.client.db.userRepo.getUser(args.member.id, msg.guild.id);

    let description = '```';

    for (const key in dbUser.skills) {
      if (dbUser.skills.hasOwnProperty(key) === true) {
        description += utility.String.capitializeWords(key) + ': ' + dbUser.skills[key] + '\n';
      }
    }

    return text.send(description + '```', { title: args.member.user.tag + '\'s Skills:' });    
  }
}

module.exports = new Skills();
