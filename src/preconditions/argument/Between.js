const { ArgumentPrecondition, PreconditionResult} = require('patron.js');

class Between extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'between'
    });
  }

  run(cmd, msg, arg, args, value, options) {
    if (value > options.maximum || value < options.minimum) {
      return PreconditionResult.fromError(cmd, 'The ' + arg.name + ' must be between ' + options.minimum + ' and ' + options.maximum + '.');
    }

    return PreconditionResult.fromSuccess();
  }
}

module.exports = new Between();