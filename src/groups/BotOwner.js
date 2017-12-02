const { Group } = require('patron.js');

class BotOwner extends Group {
  constructor() {
    super({
      name: 'botowner',
      description: 'Commands that only Bot Owners can use',
      preconditions: ['botowner']
    });
  }
}

module.exports = new BotOwner();