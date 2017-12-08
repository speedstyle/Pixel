const { RequireAll } = require('patron.js');
const { join } = require('path');
const client = require('./structures/Client.js');
const registry = require('./structures/Registry.js');

client.registry = registry;
RequireAll(join(__dirname, 'events'));
RequireAll(join(__dirname, 'intervals'));

client.db.init(client.config.mongoConnectionURL);
client.init();

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:\n' + err.stack);
});