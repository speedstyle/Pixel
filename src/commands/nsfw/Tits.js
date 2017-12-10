const { Command } = require('patron.js');
const { get } = require('snekfetch');
const utility = require('../../utility');

class Tits extends Command {
  constructor() {
    super({
      names: ['tits', 'boobs'],
      groupName: 'nsfw',
      description: 'Sends a picture of some tits'
    });
  }

  async run(msg, args, text) {
    const request = await get('http://api.oboobs.ru/boobs/0/1/random');
    const result = request.body[0];
    const file = 'http://media.oboobs.ru/' + result.preview;
    const options = {
      image: file,
      footer: {
        text: utility.String.isNullOrWhiteSpace(result.model) ? '' : 'Model: ' + result.model
      }
    };

    return text.send('', options);
  }
}

module.exports = new Tits();