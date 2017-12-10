const { TypeReader, TypeReaderResult } = require('patron.js');
const Constants = require('../utility/Constants.js')

class SkillChoiceReader extends TypeReader {
  constructor() {
    super({ type: 'skill' });
  }

  async read(command, message, argument, args, input) {
    if(Constants.skills.includes(input.toLowerCase())) {
      return TypeReaderResult.fromSuccess(input.toLowerCase());
    }

    return TypeReaderResult.fromError(command, 'This skill does not exist.');
  }
}

module.exports = new SkillChoiceReader();