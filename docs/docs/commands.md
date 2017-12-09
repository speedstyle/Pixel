All commands are catagorized by groups. Each of the following sections is a group.

The syntax of the command usage is:

`Optional paramater: []`

`Required paramater: <>`

##Table Of Contents
- [Administration](#administration)
- [Bot Owners](#botowners)
- [General](#general)
- [Moderation](#moderation)
- [Guild Owners](#owners)
- [Polls](#polls)
- [System](#system)

### Administration

These commands may only be used by a user with the set mod role with a permission level of 2 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Setmodlog|Sets the mod log channel.|`p!setmodlog <#channel>`
Setmutedrole|Sets the muted role.|`p!setmutedrole <@role>`
Setprefix|Sets the guild's prefix.|`p!setprefix <prefix>`
Setwelcome|Sets the guild's welcome message.|`p!setwelcome <message>`

### Bot Owners

These commands may only be used by the owners of Pixel.

Command | Description | Usage
---------------- | --------------| -------
Eval|Evaluate JavaScript code.|`p!eval <code>`
Exec|Executes Batch or Bash code.|`p!exec <code>`

### General

General commands.

Command | Description | Usage
---------------- | --------------| -------
Modroles|View all mod roles in this guild.|`p!modroles`
Ping|Responds with the message and hearbeat latency.|`p!ping`
Reply|Responds to check if the bot is responding.|`p!reply`
Groups|Responds with the different groups, moderator, administrator, etc.|`p!groups`

### Moderation

These commands may only be used by a user with the set mod role with a permission level of 1 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Ban|Swing the ban hammer on any member.|`p!ban <@user> [reason]`
Clear|Clear up to 100 messages in any text channel.|`p!clear <quantity> [reason]`
Kick|Kick any member.|`p!kick <@member> [reason]`
Mute|Mute any member.|`p!mute <@member> [quantity of hours] [reason]`
Unban|Lift the ban hammer on any member.|`p!unban <user> [reason]`
Unmute|Unmute any member.|`p!unmute <@member> [reason]`
Warn|Warn any member.|`p!warn <@member> [reason]`

### Owners

These commands may only be used by a user with the set mod role with a permission level of 3 or the ownership of the server.

Command | Description | Usage
---------------- | --------------| -------
Addmodrole|Add a mod role.|`p!addmodrole <@role> <permissionLevel>`
Modifymodrole|Add a mod role.|`p!modifymodrole <@role> <permissionLevel>`
Removemodrole|Remove a mod role.|`p!removemodrole <@role>`


### Polls

These commands are for polls.

Command | Description | Usage
---------------- | --------------| -------
Createpoll|Create a poll.|`p!createpoll <poll name> <choices> [days to last] [elder only] [mods only]`
Poll|Finds a poll.|`p!poll <poll>`
Polls|Finds all polls in server.|`p!polls`
Removepoll|Destroy your poll.|`p!removepoll <poll>`
Vote|Vote on a poll.|`p!vote <poll> <choice>`

### System

These commands are the normal bot commands.

Command | Description | Usage
---------------- | --------------| -------
Help|All command information.|`p!help [command]`
Info|All the information about the cash system.|`p!info`
Invite|Add Bot to your server.|`p!invite`
Statistics|Statistics about this bot.|`p!statistics`
