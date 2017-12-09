class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      mod: [],
      muted: null
    };

    this.channels = {
      modLog: null
    };

    this.settings = {
      prefix: 'p!',
      welcomeMessage: null
    };

    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;
