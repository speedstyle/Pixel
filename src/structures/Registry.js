const { Registry, RequireAll } = require('patron.js');
const { join } = require('path');
const registry = new Registry({ library: 'discord.js' });

registry.registerArgumentPreconditions(RequireAll(join(__dirname, '/../preconditions/argument')));
registry.registerPreconditions(RequireAll(join(__dirname, '/../preconditions/command')));
registry.registerGlobalTypeReaders();
registry.registerLibraryTypeReaders();
registry.registerTypeReaders(RequireAll(join(__dirname, '../readers')));
registry.registerGroups(RequireAll(join(__dirname, '/../groups')));
registry.registerCommands(RequireAll(join(__dirname, '/../commands')));

module.exports = registry;