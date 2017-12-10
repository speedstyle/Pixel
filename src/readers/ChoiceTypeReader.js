const { TypeReader, TypeReaderResult } = require('patron.js');

class ChoiceTypeReader extends TypeReader {
  constructor() {
    super({ type: 'choice' });
  }

  async read(command, message, argument, args, input) {
    for (let i = 0; i < Object.keys(args.poll.choices).length + 1; i++) {
      if (i === Number.parseFloat(input)) {
        return TypeReaderResult.fromSuccess(Object.keys(args.poll.choices)[i - 1]);
      }
    }

    return TypeReaderResult.fromError(command, 'This choice doesn\'t exist.');
  }
}

module.exports = new ChoiceTypeReader();
