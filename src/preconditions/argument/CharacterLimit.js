const { ArgumentPrecondition, PreconditionResult } = require('patron.js');

class CharacterLimit extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'characterlimit'
    });
  }

  async run(command, msg, argument, args, value, options) {
    if (value.length <= options.limit) {
      return PreconditionResult.fromSuccess();
    }

    return PreconditionResult.fromError(command, 'The ' + argument.name + ' may not be longer than ' + options.limit + ' characters.');
  }
}

module.exports = new CharacterLimit();
