const utility = require('../utility');

class XpService {
  constructor() {
    this.messages = new Map();
  }

  async giveXp(msg) {
    const lastMessage = this.messages.get(msg.author.id);
    const isMessageCooldownOver = lastMessage === undefined || Date.now() - lastMessage > utility.Constants.xp.messageCooldown;
    const isLongEnough = msg.content.length >= utility.Constants.xp.minCharLength;

    if (isMessageCooldownOver && isLongEnough) {
      this.messages.set(msg.author.id, Date.now());
      if (msg.dbUser.xp + utility.Constants.xp.xpPerMessage > msg.dbUser.xpNeeded) {
        await msg.client.db.userRepo.updateNeededXP(msg.dbGuild, msg.dbUser, msg.member);
        const newLevel = await msg.client.db.userRepo.levelUp(msg.dbGuild, msg.member);
        await utility.Text.createEmbed(msg.channel, utility.String.boldify(msg.author.tag) + ', Congrats you\'ve advanced to level ' + newLevel.level + '!');
      }

      return msg.client.db.userRepo.modifyXP(msg.dbGuild, msg.member, utility.Constants.xp.xpPerMessage);
    }
  }
}

module.exports = new XpService();
