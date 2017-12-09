const discord = require('discord.js');
const util = require('../utility');
const text = require('../utility/Text');
const client = require('../structures/Client.js');
const db = client.db;
const Constants = require('../utility/Constants');
const Random = require('../utility/Random');
const String = require('../utility/String');

class ModerationService {
  getPermLevel(dbGuild, member) {
    if (member.guild.ownerID === member.id) {
      return 3;
    }

    let permLevel = 0;

    for (const modRole of dbGuild.roles.mod.sort((a, b) => a.permissionLevel - b.permissionLevel)) {
      if (member.guild.roles.has(modRole.id) && member.roles.has(modRole.id)) {
        permLevel = modRole.permissionLevel;
      }
    }

    return member.hasPermission('ADMINISTRATOR');
  }

  tryInformUser(guild, author, action, user, reason = '') {
    return text.send(user, util.String.boldify(msg.author.tag) + ' has ' + action + ' you' + (util.String.isNullOrWhiteSpace(reason) ? '.' : ' for the following reason: ' + reason + '.'), guild);
  }

  async tryModLog(dbGuild, guild, action, color, reason = '', moderator = null, user = null, extraInfoType = '', extraInfo = '') {
    if (dbGuild.channels.modLog === null) {
      return false;
    }

    const channel = guild.channels.get(dbGuild.channels.modLog);

    if (channel === undefined) {
      return false;
    }

    const options = {
      color: Random.arrayElement(Constants.embedColors.defaults),
      footer: {
        text: 'Case #' + dbGuild.misc.caseNumber,
        icon: 'http://i.imgur.com/BQZJAqT.png'
      },
      timestamp: true,
      title: 'New moderator action.'
    };

    if (moderator !== null) {
      options.author = {
        name: moderator.tag,
        icon: moderator.avatarURL,
      };
    }

    let description = '**Action:** ' + action + '\n';

    if (String.isNullOrWhiteSpace(extraInfoType) === false) {
      description += '**'+ extraInfoType + ':** ' + extraInfo + '\n';
    }

    if (user !== null) {
      description += '**User:** ' + user.tag + ' (' + user.id + ')\n';
    }

    if (String.isNullOrWhiteSpace(reason) === false) {
      description += '**Reason:** ' + reason + '\n';
    }

    await db.guildRepo.upsertGuild(dbGuild.guildId, { $inc: { 'misc.caseNumber': 1 } });
    return text.createEmbed(channel, description, options);
  }
}

module.exports = new ModerationService();