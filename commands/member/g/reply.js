const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(self) {
        super(self, {
            name: 'reply',
            group: 'member',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }

    run(msg) {
        return msg.say('Hi, I\'m awake!');
    }
};