const { Precondition, PreconditionResult } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');

class Administrator extends Precondition {
  constructor() {
    super({
      name: 'administrator'
    });
  }

  run(cmd, msg) {
    if (ModerationService.getPermLevel(msg.dbGuild, msg.guild.member(msg.author)) >= 2) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, 'You must be an administrator in order to use this command.');
  }
}

module.exports = new Administrator();
