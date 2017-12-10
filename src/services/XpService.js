const utility = require('../utility');

class XpService {
  constructor() {
    this.messages = new Map();
  }

  async giveXp(msg) {
    const lastMessage = this.messages.get(msg.author.id);
    const isMessageCooldownOver = lastMessage === undefined || Date.now() - lastMessage > utility.Constants.xp.messageCooldown;
    const isLongEnough = msg.content.length >= utility.Constants.xp.minCharLength;
    const neededXp = await this.getNeededXp(msg.dbUser);

    if (neededXp === 'max level') {
      return;
    }

    if (isMessageCooldownOver && isLongEnough) {
      this.messages.set(msg.author.id, Date.now());
      if (msg.dbUser.xp + utility.Constants.xp.xpPerMessage > neededXp) {
        const newDbUser = await msg.client.db.userRepo.levelUp(msg.dbGuild, msg.member);
        await utility.Text.createEmbed(msg.channel, utility.String.boldify(msg.author.tag) + ', Congrats you\'ve ' + (newDbUser.level === 20 ? 'achieved the max level we currently have' : 'advanced to level ' + newDbUser.level) + '!');
      }

      return msg.client.db.userRepo.modifyXP(msg.dbGuild, msg.member, utility.Constants.xp.xpPerMessage);
    }
  }

  async giveGlobalXp(msg) {
    const globalLastMessage = this.messages.get(msg.author.id);
    const globalIsMessageCooldownOver = globalLastMessage === undefined || Date.now() - globalLastMessage > utility.Constants.xp.globalMessageCooldown;
    const globalIsLongEnough = msg.content.length >= utility.Constants.xp.globalMinCharLength;
    const globalNeededXp = await this.getNeededXp(msg.dbUser);

    if (globalNeededXp === 'max level') {
      return;
    }

    if (globalIsMessageCooldownOver && globalIsLongEnough) {
      this.messages.set(msg.author.id, Date.now());
      if (msg.dbUser.xp + utility.Constants.xp.globalXpPerMessage > globalNeededXp) {
        const newGlobalDbUser = await msg.client.db.globalUserRepo.levelUp(msg.member);
        await utility.Text.createEmbed(msg.channel, utility.String.boldify(msg.author.tag) + ', Congrats you\'ve ' + (newGlobalDbUser.level === 20 ? 'achieved the max global level we currently have' : 'advanced to level ' + newGlobalDbUser.level) + '!');
      }

      return msg.client.db.globalUserRepo.modifyXP(msg.member, utility.Constants.xp.globalXpPerMessage);
    }
  }

  async getNeededXp(dbUser) {
    const levels = utility.Constants.levels;
    const newUserLevel = dbUser.level + 1;

    for (const key in levels) {
      if (levels.hasOwnProperty(key) === true) {
        const newLevel = levels[key];
        if (newLevel.level === newUserLevel) {
          return newLevel.xpRequired;
        }
      }
    }

    return 'max level';
  }
}

module.exports = new XpService();
