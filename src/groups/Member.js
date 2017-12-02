const { Group } = require('patron.js');

class Member extends Group {
  constructor() {
    super({
      name: 'member',
      description: 'Commands that a member can use'
    });
  }
}

module.exports = new Member();