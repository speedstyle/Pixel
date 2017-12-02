const { Handler, CommandError } = require('patron.js');
const { DiscordAPIError } = require('discord.js');
const client = require('../structures/Client.js');
const credentials = require('../../credentials.json');
const handler = new Handler(client.registry);

client.on('message', async msg => {
  if (msg.author.bot || msg.content.startsWith(credentials.prefix) === false) {
    return;
  }

  const result = await handler.run(msg, credentials.prefix);

  if (result.success === false) {
    let message;

    switch (result.commandError) {
      case CommandError.CommandNotFound: {
        return;
      }
      case CommandError.Exception:
        if (result.error instanceof DiscordAPIError) {
          if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
            message = 'I don\'t have permission to do this.';
          } else if (result.error.code === 50007) {
            message = 'I don\'t have permission to message you. Please allow DMs from server members.';
          } else if (result.error.code >= 500 && result.error.code < 600) {
            message = 'There has been a problem with Discord.';
          } else {
            message = result.errorReason;
          }
        } else {
          message = result.errorReason;

          console.error(result.error);
        }
        break;
      case CommandError.InvalidArgCount:
        message = 'You\'re incorrectly using this command.\n**Usage:** `' + credentials.prefix + result.command.getUsage() + '`\n**Example:** `' + credentials.prefix + result.command.getExample() + '`';
        break;
      default:
        message = result.errorReason;
        break;
    }

    return msg.channel.send(message);
  }
});