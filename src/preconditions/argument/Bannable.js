const { ArgumentPrecondition, PreconditionResult} = require('patron.js');
const utility = require('../../utility');

class Bannable extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'bannable'
    });
  }

  run(cmd, msg, arg, args, value, options) {
    const userTag = value.tag !== undefined ? value.tag : value.user.tag;
    const member = value.bannable !== undefined ? value : msg.guild.member(value.id);

    if (msg.guild.members.has(value.id) && member.bannable === false) {
      return PreconditionResult.fromError(cmd, utility.String.boldify(userTag) + ' is not bannable.');
    }

    return PreconditionResult.fromSuccess();
  }
}

module.exports = new Bannable();
