const { Command } = require('patron.js');

class FortyEightYearOldMan extends Command {
  constructor() {
    super({
      names: ['fortyeightyearoldman', '48yearoldman', '48yearold', '48year', '48'],
      groupName: 'member',
      description: 'Sends the popular "48 Year Man From Somalia" copypasta.',
      guildOnly: false
    });
  }

  run(msg, args, text) {
    return text.send('Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play conter strik and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story');
  }
}

module.exports = new FortyEightYearOldMan();