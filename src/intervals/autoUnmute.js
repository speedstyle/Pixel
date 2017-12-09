const utility = require('../utility/');
const client = require('../structures/Client.js');
const db = client.db;

client.setInterval(async () => {
  const mutes = await db.muteRepo.findMany();

  for (let i = 0; i < mutes.length; i++) {
    if (mutes[i].mutedAt + mutes[i].muteLength > Date.now()) {
      continue;
    }

    await db.muteRepo.deleteById(mutes[i]._id);

    const guild = client.guilds.get(mutes[i].guildId);

    if (guild === undefined) {
      continue;
    }

    const member = guild.member(mutes[i].userId);

    if (member === null) {
      continue;
    }

    const dbGuild = await db.guildRepo.getGuild(guild.id);
    const role = guild.roles.get(dbGuild.roles.muted);

    if (role === undefined) {
      continue;
    }

    if (guild.me.hasPermission('MANAGE_ROLES') === false || role.position >= guild.me.highestRole.position) {
      continue;
    }

    await member.removeRole(role);
  }
}, utility.Constants.intervals.autoUnmute);