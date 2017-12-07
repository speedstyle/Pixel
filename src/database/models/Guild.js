class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      muted: null
    };
  }
}

module.exports = Guild;