const { Command, Argument } = require('patron.js');

class UpgradeSkill extends Command {
  constructor() {
    super({
      names: ['upgrade', 'upgradeskill'],
      groupName: 'member',
      description: 'Upgrade the level of a skill.',
      preconditions: ['ownskillpoint'],
      args: [
        new Argument({
          name: 'skill',
          key: 'skill',
          type: 'skill',
          example: 'magic',
          remainder: true
        }),
        new Argument({
          name: 'amount',
          key: 'amount',
          type: 'float',
          example: '2'
        })
      ]
    });
  }

  async run(msg, args, text) {
    
    const skill = 'skills.' + args.skill;
    await msg.client.db.userRepo.modifySkillPoints(msg.dbGuild, msg.member, -args.amount);
    await msg.client.db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { [skill]: args.amount } });
    const newDbUser = await msg.client.db.userRepo.getUser(msg.author.id, msg.guild.id);
    return text.reply('You have upgraded ' + args.skill + ' to ' + dbUser.skills[args.skill] + '.');
  }
}

module.exports = new UpgradeSkill();
