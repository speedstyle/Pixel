const { ArgumentPrecondition, PreconditionResult } = require('patron.js');

class Hierarchy extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'hierarchy'
    });
  }

  async run(cmd, msg, arg, args, value) {
    if (value.position < msg.guild.me.highestRole.position) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, msg.client.user.username + ' must be higher in hierarchy than ' + value + '.');
  }
}

module.exports = new Hierarchy();
