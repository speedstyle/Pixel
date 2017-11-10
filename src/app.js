// Define what Discord and credentials mean, and set the new client
// as Discord's bot client
const Discord = require("discord.js");
const credentials = require("../config/credentials.json");
const client = new Discord.Client();

// Whenever you see "${credentials.}", the line of code is calling to the "credentials.json" file
// Whener you see "$client.", the line of code is calling to the Discord client's code (../node_modules/discord.js)
// Upon successfully connecting, the bot will perform these actions
client.on("ready", () => {
// "${client.guilds.size}" is the amount of servers the bot is in
// "console.log" justs prints the text to the console
  console.log(`I have connected, and am currently in ${client.guilds.size} servers.`);
  // "${credentials.prefix}" asks the credentials.json file what the prefix is
  console.log(`My current prefix is set to ${credentials.prefix}. You can edit this in the "credentials.json" file.`);
  // This changes the bot's "game" (the "playing..." next to it's username in Discord) to the amount of servers it is in
  client.user.setPresence({
    game: {
      name: `on ${client.guilds.size} servers | ${credentials.prefix}help`,
      type: 0
    }
  });
})
// Upon being added to a server, the bot will tell the terminal the server's name, ID and number of members
client.on("guildCreate", guild => {
  console.log(`I just joined a server! It's name is: ${guild.name}, the ID is: ${guild.id} and it has ${guild.memberCount} members (including me)!`);
  // This changes the bot's game to the amount of servers it is in
  client.user.setPresence({
    game: { // "${client.guilds.size} is the amount of guilds that the bot is in"
      name: `on ${client.guilds.size} servers | ${credentials.prefix}help`,
      // "type: 0" is the standard "Online" (the green one), you can look at the discord.js docs to -
      // - view all of the other "types" https://discord.js.org
      type: 0
    }
  });
});
// Upon being kicked or banned from a server, the bot will perform these tasks
client.on("guildDelete", guild => {
  console.log(`I was kicked or banned from ${guild.name}. It's ID is ${guild.id}`);
  client.user.setGame(`on ${client.guilds.size} servers | ${credentials.prefix}help`);
})

// These events will be triggered upon recieving a command
client.on("message", async message => {
  // This tells the bot that if the message's author is a bot, STOP. Otherwise, the bot could trigger -
  // - it's own commands
  if(message.author.bot) return;
  // Without the line below, the bot would check EVERY message. The code below tells the bot to ignore any messages -
  // - that do not start with the prefix
  if(message.content.indexOf(credentials.prefix) !== 0) return;

  // Here we tell the bot what ARGS are (the part after the prefix and command) and what a COMMAND is (the prefix and command name)
  const args = message.content.slice(credentials.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Here is our first command; the infamous "ping/pong" command. My prefix is %, so with my bot, if someone said -
  // - "%ping", the bot will return the amount of miliseconds taken to respond
  if(command === "ping") {
    var pingMessage = await message.channel.send("Testing speed, this message will be edited.");
    pingMessage.edit(`Pong! The time taken between me sending the "Testing speed..." message and editing it to this is ${pingMessage.createdTimestamp - message.createdTimestamp}ms. Discord's API Latency (that cannot be controlled by my connection speed) is ${Math.round(client.ping)}ms`);
  }
  if(command === "48yearman") {
    message.reply({embed: {
      title: "48yearman Command",
      color: "65399",
      description: "Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play conter strik and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story",
    }}
  }
  if (command === "cat") {
        message.channel.send({embed: {
          title: "Cat Command",
          color: "65399",
          description: "Here's a cat, as per your request:",
          file: new Discord.Attachment('http://lorempixel.com/500/500/cats/', 'cat.jpg')
        }
      })
    }
  if (command === "help") {
        message.channel.send(`${message.author}:`, {embed: {
    title: "Help Command",
    color: "3447003",
    description: "Check your DMs :smile:"
  }
})
  message.author.send("Hey there, here is all of the information you need!", {embed: {
    title: "Help Command",
    color: "3447003",
    description: "Available commands:\n**Help**: This command, DMs you all of the available commands.\n**Cat**: Sends a random cat image!\n**Ping**: Sends an initial message and instantly edits it to the amount of time taken to perform the edit.\n**48yearman**: Sends the infamous '48 year man from somalia' copypasta.\n**Bot creator's GitHub Repository**: https://github.com/lumitedubbz/pixel"
  }
})
}
});

// This physically logs in to the bot's account (Bot'sUsername#1234)
client.login(credentials.token);
