const { CommandPrecondition, PreconditionResult } = require('patron.js');

class OwnSkillPoint extends CommandPrecondition {
  constructor() {
    super({
      name: 'ownskillpoint'
    });
  }
  
  async run(command, msg) {
    if (msg.dbUser.skillPoints > 0) {
      return PreconditionResult.fromSuccess();
    }
    
    return PreconditionResult.fromError(command, 'You do not have enough points.');
  }
}

module.exports = new OwnSkillPoint();