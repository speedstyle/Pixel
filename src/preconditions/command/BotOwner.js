const { Precondition, PreconditionResult } = require('patron.js');
const credentials = require('../../../credentials.json');

class BotOwner extends Precondition {
  constructor() {
    super({
      name: 'botowner'
    });
  }

  run(cmd, msg) {
    if (credentials.botOwners.includes(msg.author.id) === false) {
      return PreconditionResult.fromError(cmd, 'You must be a bot owner in order to use this command.');
    }

    return PreconditionResult.fromSuccess();
  }
}

module.exports = new BotOwner();