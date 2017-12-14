const BaseRepo = require('./BaseRepo.js');
const SetNewXpNeeded = require('../updates/SetNewXpNeeded.js');
const GlobalUserQuery = require('../queries/GlobalUserQuery.js');
const GlobalUser = require('../models/GlobalUser.js');

class GlobalUserRepo extends BaseRepo {
  anyUser(userId) {
    return this.any(new GlobalUserQuery(userId));
  }

  async getUser(userId) {
    const query = new GlobalUserQuery(userId);
    const fetchedUser = await this.findOne(query);

    return fetchedUser !== null ? fetchedUser : this.findOneAndReplace(query, new GlobalUser(userId));
  }

  updateUser(userId, update) {
    return this.updateOne(new GlobalUserQuery(userId), update);
  }

  findUserAndUpdate(userId, update) {
    return this.findOneAndUpdate(new GlobalUserQuery(userId), update);
  }

  async upsertUser(userId, update) {
    if (await this.anyUser(userId)) {
      return this.updateUser(userId, update);
    }

    return this.updateOne(new GlobalUser(userId), update, true);
  }

  async findUserAndUpsert(userId, update) {
    if (await this.anyUser(userId)) {
      return this.findUserAndUpdate(userId, update);
    }

    return this.findOneAndUpdate(new GlobalUser(userId), update, true);
  }

  async modifyXP(member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, { $inc: { 'xp': change } });

    return newDbUser;
  }

  async modifyLevel(member, change) {
    const newDbUser = await this.findUserAndUpsert(member.id, { $inc: { 'level': change } });

    return newDbUser;
  }

  deleteUser(userId) {
    return this.deleteOne(new GlobalUserQuery(userId));
  }

  deleteUsers() {
    return this.deleteMany();
  }
}

module.exports = GlobalUserRepo;
