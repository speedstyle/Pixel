const client = require('../structures/Client.js')

client.on('error', err => {
  client.channels.get('385529629626335234').send('An error occured! ' + err);

  console.error('Error! ' + err + '.');
});