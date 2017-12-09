const { ArgumentPrecondition, PreconditionResult } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');

class NoModerator extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'nomoderator'
    });
  }

  async run(command, msg, argument, args, value, options) {
    if (ModerationService.getPermLevel(msg.dbGuild, value) === 0) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(command, 'You may not use this command on a moderator.');
  }
}

module.exports = new NoModerator();
