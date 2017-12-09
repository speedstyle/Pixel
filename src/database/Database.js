const { MongoClient } = require('mongodb');
const GuildRepo = require('./repos/GuildRepo.js');
const MuteRepo = require('./repos/MuteRepo.js');
const PollRepo = require('./repos/PollRepo.js');

class Database {
  constructor() {
    this.queries = {
      Guild: require('./queries/GuildQuery.js'),
      Id: require('./queries/IdQuery.js'),
      Mute: require('./queries/MuteQuery.js'),
      Poll: require('./queries/PollQuery.js')
    };

    this.updates = {
      Pull: require('./updates/PullUpdate.js'),
      Push: require('./updates/PushUpdate.js')
    };

    this.models = {
      Guild: require('./models/Guild.js'),
      Mute: require('./models/Mute.js'),
      Poll: require('./models/Poll.js')
    };
  }

  async init(url) {
    const database = await MongoClient.connect(url);
    const dbName = database.s.options.dbName;
    const db = database.db(dbName);

    this.guildRepo = new GuildRepo(await db.createCollection('guilds'));
    this.muteRepo = new MuteRepo(await db.createCollection('mutes'));
    this.pollRepo = new PollRepo(await db.createCollection('polls'));

    await db.collection('guilds').createIndex('guildId', { unique: true });
  }
}

module.exports = Database;