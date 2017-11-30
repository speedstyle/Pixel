const { Command } = require('discord.js-commando');

module.exports = class 48yearmanCommand extends Command {
    constructor(client) {
        super(client, {
            name: '48yearman',
            group: 'member',
            memberName: '48yearman',
            description: 'Sends the popular \"48 Year Man From Somalia\" copypasta.',
            examples: ['48yearman']
        });
    }

    run(msg) {
        return msg.say('Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play conter strik and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story');
    }
};
