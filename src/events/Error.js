const client = require('../structures/Client.js')

client.on('error', (err) => {
            msg.channel.send('Error! ' + err + '. Please report this to my creators as soon as possible: https://discord.me/pixelsupport');
            console.log('Error! ' + err + '.');
});