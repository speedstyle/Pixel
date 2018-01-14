const { Client: DiscordJSClient } = require('discord.js');
const Constants = require('../utility/Constants.js');
const Database = require('../database/Database.js');
const envfile = require('fs').readFileSync('../../.env','UTF8');
const credentials = eval(envfile.splice(1,envfile.indexOf('\n')));

class Client extends DiscordJSClient {
  constructor(config) {
    super({
      fetchAllMembers: true,
      disableEveryone: true,
      messageCacheMaxSize: 5,
      messageCacheLifetime: 10,
      messageSweepInterval: 1800,
      disabledEvents: Constants.disabledEvents
    });

    this.config = config;
    this.db = new Database();
  }

  init() {
    return this.login(this.config.token).catch(err => console.error(err));
  }
}

module.exports = new Client(credentials);
