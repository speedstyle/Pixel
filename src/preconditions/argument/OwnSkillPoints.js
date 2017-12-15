const { ArgumentPrecondition, PreconditionResult } = require('patron.js');

class OwnSkillPoints extends ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownskillpoints'
    });
  }
  
  async run(cmd, msg, arg, args, value) {
    const quantity = args.quantity !== undefined ? args.quantity : 1;

    if (msg.dbUser.skillPoints >= quantity) {
      return PreconditionResult.fromSuccess();
    }
    
    return PreconditionResult.fromError(cmd, 'You do not have ' + quantity + ' skill points.');
  }
}

module.exports = new OwnSkillPoints();
