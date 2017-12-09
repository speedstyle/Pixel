class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      muted: null
    };
    this.channels = {
      modLog: null
    };
    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;