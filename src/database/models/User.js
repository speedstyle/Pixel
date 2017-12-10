class User {
  constructor(userId, guildId) {
    this.userId = userId;
    this.guildId = guildId;
    this.level = 1;
    this.xp = 0;
  }
}

module.exports = User;
