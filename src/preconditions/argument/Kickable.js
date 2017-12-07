const { ArgumentPrecondition, PreconditionResult} = require('patron.js');
const utility = require('../../utility');

class Kickable extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'kickable'
    });
  }

  run(cmd, msg, arg, args, value, options) {
    const userTag = value.tag !== undefined ? value.tag : value.user.tag;

    if (value.kickable === false) {
      return PreconditionResult.fromError(cmd, utility.String.boldify(userTag) + ' is not kickable.');
    }

    return PreconditionResult.fromSuccess();
  }
}

module.exports = new Kickable();
