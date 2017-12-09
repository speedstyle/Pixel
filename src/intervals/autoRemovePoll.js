const utility = require('../utility/');
const client = require('../structures/Client.js');
const db = client.db;

client.setInterval(async () => {
  const polls = await db.pollRepo.findMany();

  for (let i = 0; i < polls.length; i++) {
    if ((Date.now() - polls[i].createdAt) - polls[i].length <= 0) {
      continue;
    }

    await db.pollRepo.deleteById(polls[i]._id);

    const guild = client.guilds.get(polls[i].guildId);

    if (guild === undefined) {
      continue;
    }

    const creator = guild.member(polls[i].creatorId);

    if (creator === null) {
      continue;
    }

    let choices = '';

    for (const key in polls[i].choices) {
      choices += '`' + key + '` Votes: ' + polls[i].choices[key] + ', ';
    }

    await creator.user.tryDM(choices.substring(0, choices.length - 2) + 'Final Poll Results Of `' + polls[i].name + '` Poll In Server `' + guild.name + '`.');
  }
}, utility.Constants.intervals.autoRemovePoll);
