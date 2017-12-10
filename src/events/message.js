const { Handler, CommandError } = require('patron.js');
const { DiscordAPIError } = require('discord.js');
const Constants = require('../utility/Constants.js');
const Text = require('../utility/Text.js');
const client = require('../structures/Client.js');
const handler = new Handler(client.registry);
const XpService = require('../services/XpService.js');

client.on('message', async msg => {
  if (msg.author.bot) {
    return;
  }

  let prefix = '';

  if (msg.guild !== null) {
    msg.dbGuild = await client.db.guildRepo.getGuild(msg.guild.id);
    msg.dbUser = await client.db.userRepo.getUser(msg.author.id, msg.guild.id);

    prefix = msg.dbGuild.settings.prefix;
  } else {
    prefix = Constants.defaultPrefix;
  }

  if (!msg.content.startsWith(prefix)) {
    return msg.guild !== null ? XpService.giveXp(msg) : null;
  }

  const text = new Text(msg);
  const result = await handler.run(msg, prefix, text);

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
        message = 'You\'re incorrectly using this command.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';
        break;
      default:
        message = result.errorReason;
        break;
    }

    return text.sendError(message);
  }
});