const { Group } = require('patron.js');

class NSFW extends Group {
  constructor() {
    super({
      name: 'nsfw',
      description: 'Commands that can help you bust a fat nut',
      preconditions: ['nsfw']
    });
  }
}

module.exports = new NSFW();