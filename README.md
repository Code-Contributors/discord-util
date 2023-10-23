# **DISCORD-UTIL**
[![](https://img.shields.io/discord/1010915072694046794?label=discord&style=for-the-badge&logo=discord&color=5865F2&logoColor=white)](https://discord.gg/gg8mkc4ecP)
[![](https://aschey.tech/tokei/github/tibue99/ezcord?style=for-the-badge)](https://github.com/Code-Contributors/discord-util)

> **discord-utilies is a powerful NPM package with various utility features for your Discord Bot**

## **⚙ Installation**
**For the newest version use npm i discord-utilies@latest**
```
npm i discord-util
```

## **📜 Features**
- Easy-To-Use
- Feature Rich
- Beginner Friendly
- Slash Command Support
- Error Handling
- Custom Logging
- Cog Loading
- Level System

## **📚 Usage**
Here is a Example Code with the SlashCommandLoader and The MemoryGame Class
```js
const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandLoader, MemoryGame } = require('discord-utilies') // import { SlashCommandLoader, FindEmojiGame } from 'discord-utilies';

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});


client.on('ready', () => {
    console.log('Ready!');
    const commandLoader = new SlashCommandLoader(client);
    commandLoader.loadCommands('./commands');
});

client.on('messageCreate', async message => {
    if (message.content === 'findemoji') {
        const game = new MemoryGame({
            message: message,
            embed: {
                color: 'Blurple',
                description: 'Find the Emoji!',
                title: 'Find the Emoji Game'
            },
            contentMsg: '',
            emojis: ['💀', '🤓', '😏', '😥'], // ...
            winMessage: 'You won! The Emoji {emoji} was correct!',
            loseMessage: 'You lost! The Emoji was {emoji}'
        })
        game.startGame();
        game.on('gameOver', result => {
            console.log(result);
        });
    }
});
```
Here is an Example Code with the EasyBot Class:
```js
const { EasyBot, Intents } = require('discord-utilies');

const bot = new EasyBot({ intents: [Intents.Guilds, Intents.GuildMessages, Intents.MessageContent] });

bot.once('ready', () => {
    console.log(`${bot.user.username} is ready`);
    bot.user.setPresence({
        status: 'idle'
    });
}); // bot.onReady({ consoleLog: `${bot.user.username} is ready`, presence: { status: 'idle' } });

bot.event('messageCreate', async message => {
    if (message.content === '!ping') {
        await message.reply({ content: 'Pong!' });
    }
}); // bot.onMessage({ trigger: '!ping', reply: { message: 'Pong!' } });

bot.run('DISCORD BOT TOKEN');
```
Here is an Example Code with the Level System:
```js
const { Client } = require('discord.js') // npm i discord.js
const bot = new Client({
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
    intents: [
        'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS',
        'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS',
        'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'
    ]
});

const prefix = '!';
const { LevelSystem } = require('discord-utilies');

const leveling = new LevelSystem(bot, {
    storagePath: './leveling.json', // Full path to a JSON file. Default: './leveling.json'.
    checkStorage: true, // Checks the if database file exists and if it has errors. Default: true.
    xp: 5, // Amount of XP that user will receive after sending a message. Default: 5.
    maxXP: 300, // Amount of XP that user will need to reach the next level. This value will double for each level. Default: 300.
    status: true, // You can enable or disable the leveling system using this option. Default: true.
    lockedChannels: [], // Array of channel IDs that won't give XP to users. Default: [].
    ignoredUsers: [], // Array of user IDs that won't give XP. Default: [].
    ignoreBots: true, // If true, every message from bots won't give them XP. Default: true.

    /**
     * Filter function that accepts a message; 
     * it must return a boolean value and it will add XP 
     * only to authors of filtered messages.; 
     * Use 'null' to disable the filter. 
     * 
     * Default: '() => true'.
     */
    filter: msg => !msg.content.startsWith(prefix),
    updater: {
        checkUpdates: true, // Sends the update state message in console on start. Default: true.
        upToDateMessage: true // Sends the message in console on start if module is up to date. Default: true.
    },
    errorHandler: {
        handleErrors: true, // Handles all errors on start. Default: true.
        attempts: 5, // Amount of attempts to load the module. Use 'null' for infinity attempts. Default: 5.
        time: 3000 // Time between every attempt to start the module. Default: 3000.
    },
    optionsChecker: {
        ignoreInvalidTypes: false, // Allows the method to ignore the options with invalid types. Default: false.
        ignoreUnspecifiedOptions: false, // Allows the method to ignore the unspecified options. Default: false.
        ignoreInvalidOptions: false, // Allows the method to ignore the unexisting options. Default: false.
        showProblems: false, // Allows the method to show all the problems in the console. Default: false.
        sendLog: false, // Allows the method to send the result in the console. Default: false.
        sendSuccessLog: false // Allows the method to send the result if no problems were found. Default: false.
    }
});

leveling.on('levelUp', data => {
    data.sendMessage(`Congrats, ${data.user}, you just reached the level **${data.level}**! 🎉`)
})

```


## **❓Support**
You can join the Support Server [here](https://discord.gg/xw5CyEPfPA)
