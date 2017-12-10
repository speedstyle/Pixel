const { TypeReader, TypeReaderResult } = require('patron.js');

class PollTypeReader extends TypeReader {
  constructor() {
    super({ type: 'poll' });
  }

  async read(command, message, argument, args, input) {
    const poll = await message.client.db.pollRepo.findOne({ guildId: message.guild.id, index: Number.parseFloat(input) });

    if (poll !== null) {
      return TypeReaderResult.fromSuccess(poll);
    }

    return TypeReaderResult.fromError(command, 'This poll doesn\'t exist.');
  }
}

module.exports = new PollTypeReader();
