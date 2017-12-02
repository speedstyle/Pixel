const { Command, Argument } = require('patron.js');
const { inspect } = require('util');

class Eval extends Command {
  constructor() {
    super({
      names: ['eval'],
      groupName: 'botowner',
      description: 'Evaluates JavaScript code',
      guildOnly: false,
      args: [
        new Argument({
          key: 'code',
          name: 'code',
          type: 'string',
          example: 'client.token',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    try {
      const client = msg.client;
      const member = msg.member;
      const guild = msg.guild;
      const author = msg.author;
      const channel = msg.channel;
      let result = eval(args.code);

      if (result !== undefined && typeof result.then === 'function') {
        result = await result;
      }

      if (typeof result !== 'string') {
        result = inspect(result, { depth: 0 });
      }

      result = result.replace(msg.client.token, ' ');

      return msg.channel.send('**Eval**:\n```js\n' + args.code + '```\n' + '**Returns**:\n```js\n' + result + '```');
    } catch (err) {
      return msg.channel.send('**Eval**:\n```js\n' + args.code + '```\n' + '**Error**:\n```js\n' + err + '```');
    }
  }
}

module.exports = new Eval();