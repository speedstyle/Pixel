class User {
  constructor(userId, guildId) {
    this.userId = userId;
    this.guildId = guildId;
    this.health = 0;
    this.skillPoints = 0,
    this.skill = 0,
    this.level = 1;
    this.xp = 0;
    this.skills = {
      magic: 1,
      damage: 1,
      healing: 1,
      craftmanship: 1,
      intelligence: 1,
      haste: 1
    };
  }
}

module.exports = User;
