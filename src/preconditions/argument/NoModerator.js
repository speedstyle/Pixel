const { ArgumentPrecondition, PreconditionResult } = require('patron.js');
const ModerationService = require('../../services/ModerationService.js');

class NoModerator extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'nomoderator'
    });
  }

  async run(command, msg, argument, args, value, options) {
    const member = value.bannable !== undefined ? value : msg.guild.member(value);

    if (msg.guild.members.has(value.id) === false || ModerationService.getPermLevel(msg.dbGuild, member) === 0) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(command, 'You may not use this command on a moderator.');
  }
}

module.exports = new NoModerator();
