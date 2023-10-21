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

## **📚 Usage**
```js
const { Client, GatewayIntentBits } = require('discord.js');
const { SlashCommandLoader, FindEmojiGame } = require('discord-utilies') // import { SlashCommandLoader, FindEmojiGame } from 'discord-utilies';

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
        const game = new FindEmojiGame({
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

## **❓Support**
Join the Support Server [here](https://discord.gg/xw5CyEPfPA)