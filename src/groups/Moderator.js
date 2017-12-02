const { Group } = require('patron.js');

class Moderator extends Group {
  constructor() {
    super({
      name: 'moderator',
      description: 'Commands that a moderator can use',
      preconditions: ['moderator']
    });
  }
}

module.exports = new Moderator();