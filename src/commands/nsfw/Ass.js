const { Command } = require('patron.js');
const { get } = require('snekfetch');
const utility = require('../../utility');

class Ass extends Command {
  constructor() {
    super({
      names: ['ass', 'butt'],
      groupName: 'nsfw',
      description: 'Sends a picture of some ass'
    });
  }

  async run(msg, args, text) {
    const request = await get('http://api.obutts.ru/butts/0/1/random');
    const result = request.body[0];
    const file = 'http://media.obutts.ru/' + result.preview;
    const options = {
      image: file,
      footer: {
        text: utility.String.isNullOrWhiteSpace(result.model) ? '' : 'Model: ' + result.model
      }
    };

    return text.send('', options);
  }
}

module.exports = new Ass();
