// Define what Discord and credentials mean, and set the new client
// as Discord's bot client
const Discord = require("discord.js");
const credentials = require("../config/credentials.json");
const client = new Discord.Client();
const fs = require('fs');

var userData =JSON.parse(fs.readFileSync('../config/userData.json', 'utf8'));

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
  var mainChannel = guild.mainChannel;
  console.log(`I just joined a server! It's name is: ${guild.name}, the ID is: ${guild.id} and it has ${guild.memberCount} members (including me)!`);
  if (mainChannel !== undefined) {
    var joinEmbed = new Discord.RichEmbed()
    .addField(`Hey there, ${guild.name}! I'm ${credentials.botName}. You can view all of the commands by typing "${credentials.prefix}help". I hope you enjoy using me!`)
    .setAuthor("Hey! I'm Pixel :smile:")
    mainChannel.send({embed: joinEmbed})
  }
  client.user.setPresence({
    game: { // "${client.guilds.size} is the amount of guilds that the bot is in"
    name: `on ${client.guilds.size} servers | ${credentials.prefix}help`,
    type: 0
      }
    });
});
// This changes the bot's game to the amount of servers it is in
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
  // Now for embeds! The author is the top part of the embed, usually in bold text. The color is, in this situation is a decimal code for a light green-y blue colour.
  // The description is best described as the main body of text
  if(command === "48yearman") {
    message.reply({embed: {
      author: "48yearman Command",
      color: "65399",
      description: "Hello am 48 year man from somalia. Sorry for my bed england. I selled my wife for internet connection for play conter strik and i want to become the goodest player like you I play with 400 ping on brazil and i am global elite 2. pls no copy pasterio my story",
    }})
  }
  if (command === "cat") {
        message.channel.send({embed: {
          author: "Cat Command",
          color: "65399",
          description: "Here's a cat, as per your request:",
          // The "file" attatched to the embed in this situation is a random cat image
          file: new Discord.Attachment('http://lorempixel.com/500/500/cats/', 'cat.jpg')
        }
      })
    }
  if (command === "help") {
        message.channel.send(`${message.author}:`, {embed: {
    author: "Help Command",
    color: "3447003",
    description: "Check your DMs :smile:"
  }
})
  message.author.send("Hey there, here is all of the information you need!", {embed: {
    author: "Help Command",
    color: "3447003",
    // "\n" just creates a new line
    description: "Available commands:\n**Help**: This command, DMs you all of the available commands.\n**Cat**: Sends a random cat image!\n**Ping**: Sends an initial message and instantly edits it to the amount of time taken to perform the edit.\n**48yearman**: Sends the infamous '48 year man from somalia' copypasta.\n**Bot creator's GitHub Repository**: https://github.com/lumitedubbz/pixel"
  }
})
}
  if(command === "kick") {
    // In JavaScript "if(!something)" means "if the thing inside the brackets is false, do this".
    // ".hasPermission" checks if the author of the kick message command has the Discord role permission to kick members.
    // "return..." stops the entire operation.
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("sorry, you don't have permission to kick members.");
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("it seems I do not have permission to perform this action. Does my role have the kick membes permission?");
    // "message.mentions.users.first()" is the first user @mentioned in the command.
    let userToKick = message.mentions.users.first();
    let kickReason = args.slice(1).join(" ");
    let modLog = client.channels.find("name", "pixel-log");

    if(!modLog) return message.channel.send("No moderator log found. Performing action but it WILL NOT BE LOGGED.");
    // The line of code below tells the bot that is the first mention is less than one character long (in this case, just an "@" symbol), cancel the operation.
    if(message.mentions.users.size < 1) return message.reply("you did not provide a user to kick. Aborting operation.");
    if(!kickReason) reason="No reason provided";
    if(!message.guild.member(userToKick)
    // ".kickable" is the query of whether or not the user can be kicked.
    .kickable) return message.reply("that user has a role above my highest role.")

    // This is the actual kick.
    await message.guild.member(userToKick).kick(reason)

    var kickEmbed = new Discord.RichEmbed()
    .setAuthor(`User kicked: ${userToKick.username}`, userToKick.displayAvatarURL)
    .addField(`Full information: **User kicked**: ${userToKick.tag}\n**Moderator**: ${message.author.tag}\n**Reason**: ${reason}`);
    modLog.send({embed: kickEmbed})
    // ".catch(error...)" catches and errors before they happen.
          .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  }
  if(command === "ban") {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("sorry, you don't have permission to ban members.");
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("it seems I do not have permission to perform this action. Does my role have the kick membes permission?");
    // "message.mentions.users.first()" is the first user @mentioned in the command.
    let userToBan = message.mentions.users.first();
    let banReason = args.slice(1).join(" ");
    let modLog = client.channels.find("name", "pixel-log");

    if(!modLog) return message.channel.send("No moderator log found. Performing action but it WILL NOT BE LOGGED.");
    // The line of code below tells the bot that is the first mention is less than one character long (in this case, just an "@" symbol), cancel the operation.
    if(message.mentions.users.size < 1) return message.reply("you did not provide a user to kick. Aborting operation.");
    if(!banReason) reason="No reason provided";
    if(!message.guild.member(userToKick)
    // ".kickable" is the query of whether or not the user can be kicked.
    .kickable) return message.reply("that user has a role above my highest role.")

    // This is the actual kick.
    await message.guild.member(userToKick).ban(reason)

    var banEmbed = new Discord.RichEmbed()
    .setAuthor(`User kicked: ${userToKick.username}`, userToKick.displayAvatarURL)
    .addField(`Full information: **User kicked**: ${userToKick.tag}\n**Moderator**: ${message.author.tag}\n**Reason**: ` + reason + ".");
    modLog.send({embed: banEmbed})
    userToBan.send({embed: banEmbed})
    // ".catch(error...)" catches and errors before they happen.
          .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  }
  if (!userData[message.author.id]) userData[message.author.id] = {
    messagesSent: 0
  }

  userData[message.author.id].messagesSent++;

  fs.writeFile('config/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  });
});

// This physically logs in to the bot's account (Bot'sUsername#1234)
client.login(credentials.token);