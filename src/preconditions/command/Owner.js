const { Precondition, PreconditionResult } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');

class Owner extends Precondition {
  constructor() {
    super({
      name: 'owner'
    });
  }

  run(cmd, msg) {
    if (ModerationService.getPermLevel(msg.dbGuild, msg.guild.member(msg.author)) === 3) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, 'You must be an owner in order to use this command.');
  }
}

module.exports = new Owner();
