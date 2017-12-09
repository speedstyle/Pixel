const { Precondition, PreconditionResult } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');

class Moderator extends Precondition {
  constructor() {
    super({
      name: 'moderator'
    });
  }

  run(cmd, msg) {
    if (ModerationService.getPermLevel(msg.dbGuild, msg.guild.member(msg.author)) >= 1) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, 'You must be a moderator in order to use this command.');
  }
}

module.exports = new Moderator();
