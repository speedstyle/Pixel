const { Precondition, PreconditionResult } = require('patron.js');

class Moderator extends Precondition {
  constructor() {
    super({
      name: 'moderator'
    });
  }

  run(cmd, msg) {
    if (msg.member.hasPermission('ADMINISTRATOR')) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, 'You must have the Administrator permission in order to use this command.');
  }
}

module.exports = new Moderator();