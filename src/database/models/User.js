class User {
  constructor(userId, guildId) {
    this.userId = userId;
    this.guildId = guildId;
    this.level = 1;
    this.xp = 0;
    this.xpNeeded = 50;
  }
}

module.exports = User;
