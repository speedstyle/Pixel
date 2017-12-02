const client = require('../structures/Client.js');

client.on('disconnect', () => {
  console.log('Pixel has disconnected.');
});