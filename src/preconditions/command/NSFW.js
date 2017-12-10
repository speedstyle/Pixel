const { Precondition, PreconditionResult } = require('patron.js');

class NSFW extends Precondition {
  constructor() {
    super({
      name: 'nsfw'
    });
  }

  run(cmd, msg) {
    if (msg.channel.nsfw !== false) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(cmd, 'Sorry, this channel is not marked as NSFW. NSFW commands only work in NSFW channels. You can make ' + msg.channel.name + ' a NSFW channel in its settings.');
  }
}

module.exports = new NSFW();