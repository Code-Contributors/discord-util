"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandLoader = exports.SlashCommandOptionTypes = exports.FindEmojiGame = exports.Approve = exports.shuffleArray = exports.getAlphaEmoji = exports.oppDirection = exports.move = exports.decode = exports.formatMessage = exports.getNumEmoji = exports.disableButtons = exports.BBuilder = exports.Msg = void 0;
const diswrap_1 = require("diswrap");
const events_1 = require("events");
var discord_js_1 = require("discord.js");
Object.defineProperty(exports, "Msg", { enumerable: true, get: function () { return discord_js_1.Message; } });
const fs = require("fs");
/**
 * The BBuilder (Button Builder)
 */
class BBuilder extends diswrap_1.ButtonBuilder {
    constructor(options) {
        super(options);
    }
    setStyle(style) {
        this.data.style = style;
        return this;
    }
    removeLabel() {
        this.data.label = null;
        return this;
    }
    removeEmoji() {
        this.data.emoji = null;
        return this;
    }
}
exports.BBuilder = BBuilder;
/**
 * The `disableButtons` Function. With this you can Disable Buttons
 * @param components - The Components
 * @returns
 */
function disableButtons(components) {
    for (let x = 0; x < components.length; x++) {
        for (let y = 0; y < components[x].components.length; y++) {
            components[x].components[y] = BBuilder.from(components[x].components[y]);
            components[x].components[y].setDisabled(true);
        }
    }
    return components;
}
exports.disableButtons = disableButtons;
/**
 * The `getNumEmoji` Function. Get a Number Emoji using this Function
 * @param number - The Number
 * @returns
 */
function getNumEmoji(number) {
    const numEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return numEmoji[number];
}
exports.getNumEmoji = getNumEmoji;
/**
 * The `formatMessage` Function. This formats Messages into d.js Code
 * @param options - The Options
 * @param contentMsg - The Content Message
 * @returns
 */
function formatMessage(options, contentMsg) {
    const { message, opponent } = options;
    let content = options[contentMsg];
    content = content.replace('{player.tag}', message.author.tag).replace('{player-username}', message.author.username).replace('{player}', `<@!${message.author.id}>`);
    content = content.replace('{opponent.tag}', opponent?.tag).replace('{opponent.username}', opponent?.username).replace('{opponent}', `<@!${opponent?.id}>`);
    return content;
}
exports.formatMessage = formatMessage;
/**
 * The `decode` Function. Decode Content with 'html entities'
 * @param content - The Content to Decode
 * @returns
 */
function decode(content) {
    return require('html-entities').decode(content);
}
exports.decode = decode;
/**
 * The `move` Function.
 * @param pos - The Position
 * @param direction - The Direction
 * @returns
 */
function move(pos, direction) {
    if (direction === 'up')
        return { x: pos.x, y: pos.y - 1 };
    else if (direction === 'down')
        return { x: pos.x, y: pos.y + 1 };
    else if (direction === 'left')
        return { x: pos.x - 1, y: pos.y };
    else if (direction === 'right')
        return { x: pos.x + 1, y: pos.y };
    else
        return pos;
}
exports.move = move;
/**
 * The `oppDirection` Function.
 * Manage oppDirections in your Code
 * @param direction - The Direction(s)
 * @returns
 */
function oppDirection(direction) {
    if (direction === 'up')
        return 'down';
    else if (direction === 'down')
        return 'up';
    else if (direction === 'left')
        return 'right';
    else if (direction === 'right')
        return 'left';
    return direction;
}
exports.oppDirection = oppDirection;
/**
 * The `getAlphaEmoji` Function.
 * Get an AlphaEmoji based on the Letter.
 * @param letter - The Letter
 * @returns
 */
function getAlphaEmoji(letter) {
    const letters = {
        A: '🇦', B: '🇧', C: '🇨', D: '🇩', E: '🇪', F: '🇫', G: '🇬', H: '🇭', I: '🇮',
        J: '🇯', K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🇴', P: '🇵', Q: '🇶', R: '🇷',
        S: '🇸', T: '🇹', U: '🇺', V: '🇻', W: '🇼', X: '🇽', Y: '🇾', Z: '🇿',
    };
    if (letter === '0')
        return Object.keys(letters).slice(0, 12);
    if (letter === '1')
        return Object.keys(letters).slice(12, 24);
    return letters[letter];
}
exports.getAlphaEmoji = getAlphaEmoji;
;
/**
 * The `shuffleArray` Function.
 * Shuffle your Arrays easily
 * @param array - The Array
 * @returns
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
/**
 * The `Approve` Class.
 * This manage the Most of the Games
 */
class Approve extends events_1.EventEmitter {
    player1Turn;
    options;
    message;
    opponent;
    constructor(options) {
        super();
        if (!options.embed)
            options.embed;
        if (!options.embed.requestTitle)
            options.embed.requestTitle = options.embed.title;
        if (!options.embed.requestColor)
            options.embed.requestColor = options.embed.color;
        if (!options.embed.rejectTitle)
            options.embed.rejectTitle = options.embed.title;
        if (!options.embed.rejectColor)
            options.embed.rejectColor = options.embed.color;
        if (!options.buttons)
            options.buttons = {};
        if (!options.buttons.accept)
            options.buttons.accept = 'Accept';
        if (!options.buttons.reject)
            options.buttons.reject = 'Reject';
        if (!options.reqTimeoutTime)
            options.reqTimeoutTime = 30000;
        if (typeof options.mentionUser === 'undefined')
            options.mentionUser = false;
        if (!options.requestMessage)
            options.requestMessage = '{player} has invited you for a round of Game.';
        if (!options.rejectMessage)
            options.rejectMessage = 'The player denied your request for a round of Game.';
        if (!options.reqTimeoutMessage)
            options.reqTimeoutMessage = 'Dropped the game as the player did not respond.';
        this.options = options;
        this.message = options.message;
        this.opponent = options.opponent;
    }
    /**
     *
     * @param content - The Message Content
     * @returns
     */
    async sendMessage(content) {
        if (this.options.isSlashGame)
            return await this.message.editReply(content).catch(e => { });
        else
            return await this.message.channel.send(content).catch(e => { });
    }
    async approve() {
        return new Promise(async (resolve) => {
            const embed = new diswrap_1.EmbedBuilder()
                .setColor(this.options.embed.requestColor)
                .setTitle(this.options.embed.requestTitle)
                .setDescription(formatMessage(this.options, 'requestMessage'));
            const btn1 = new diswrap_1.ButtonBuilder().setLabel(this.options.buttons.accept).setCustomId('approve_accept').setStyle(diswrap_1.ButtonStyle.Success);
            const btn2 = new diswrap_1.ButtonBuilder().setLabel(this.options.buttons.reject).setCustomId('approve_reject').setStyle(diswrap_1.ButtonStyle.Danger);
            const row = new diswrap_1.ActionRowBuilder().addComponents(btn1, btn2);
            const content = this.options.mentionUser ? `<@!${this.opponent.id}>` : null;
            const msg = await this.sendMessage({ content, embeds: [embed], components: [row], allowedMentions: { parse: ['users'] } });
            const collector = msg.createMessageComponentCollector({ time: this.options.reqTimeoutTime });
            collector.on('collect', async (btn) => {
                await btn.deferUpdate().catch(e => { });
                if (btn.user.id === this.opponent.id)
                    collector.stop(btn.customId.split('_')[1]);
            });
            collector.on('end', async (_, reason) => {
                if (reason === 'accept')
                    return resolve(msg);
                const newEmbed = new diswrap_1.EmbedBuilder()
                    .setColor(this.options.embed.rejectColor)
                    .setTitle(this.options.embed.rejectTitle)
                    .setDescription(formatMessage(this.options, 'rejectMessage'));
                if (reason === 'time')
                    newEmbed.setDescription(formatMessage(this.options, 'reqTimeoutMessage'));
                this.emit('gameOver', { result: reason, player: this.message.author, opponent: this.opponent });
                await msg.edit({ content: null, embeds: [newEmbed], components: [] });
                return resolve(false);
            });
        });
    }
    formatTurnMessage(options, contentMsg) {
        const { message, opponent } = options;
        let player1 = (!this.player1Turn) ? opponent : message.author;
        let content = options[contentMsg];
        content = content.replace('{player.tag}', player1.tag).replace('{player.username}', player1.username).replace('{player}', `<@!${player1.id}>`);
        content = content.replace('{opponent.tag}', opponent.tag).replace('{opponent.username}', opponent.username).replace('{opponent}', `<@!${opponent.id}>`);
        return content;
    }
}
exports.Approve = Approve;
/**
 * The `FindEmoji` Class.
 * With this Game you can play `FindEmoji` with your Bot
 * @example JavaScript
 * const { Client } = require("discord.js");
 * const { FindEmoji } = require('discord-utilies');
 * const bot = new Client({
    intents: 'Guilds',
   });

   bot.on('messageCreate', async (message) => {
      if (message.content === 'findemoji') {
        const game = new FindEmoji({
            message: message,
            emojis: ['💀', '🤓', '😏', '😥'], // ...
            embed: {
                color: 'Blurple',
                description: 'Play Find the Emoji!',
                title: 'Find the Emoji'
            },
            contentMsg: '',
            winMessage: 'You won! The Emoji {emoji} was correct!',
            loseMessage: 'You lost! The Emoji was {emoji}'
        });

        game.startGame();
    }
   });
   @example TypeScript
   import { Client } from "discord.js";
import { FindEmoji } from 'discord-utilies';
const bot = new Client({
    intents: 'Guilds',
});

bot.on('messageCreate', async (message) => {
    if (message.content === 'findemoji') {
        const game = new FindEmoji({
            message: message,
            emojis: ['💀', '🤓', '😏', '😥'], // ...
            contentMsg: `${null}`,
            embed: {
                color: 'Blurple',
                description: 'Play Find the Emoji!',
                title: 'Find the Emoji'
            },
            winMessage: 'You won! The Emoji {emoji} was correct!',
            loseMessage: 'You lost! The Emoji was {emoji}'
        });

        game.startGame();
        game.on('gameOver', async result => {
            console.log(result);
        });
    }
})
 */
class FindEmojiGame extends events_1.EventEmitter {
    options;
    message;
    emojis;
    selected;
    emoji;
    constructor(options) {
        super();
        this.options = {
            isSlashGame: false,
            embed: {
                title: 'Find Emoji',
                color: 'Random',
                description: 'Remember the emojis from the board below.',
                findDescription: 'Find the {emoji} emoji before the time runs out.',
            },
            timeoutTime: 60000,
            hideEmojiTime: 5000,
            buttonStyle: diswrap_1.ButtonStyle.Primary,
            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🍒'],
            winMessage: 'You won! You selected the correct emoji. {emoji}',
            loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
            timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
            playerOnlyMessage: false,
            ...options,
        };
        if (!this.options.message)
            throw new TypeError('NO_MESSAGE: No message option was provided.');
        if (typeof this.options.message !== 'object')
            throw new TypeError('INVALID_MESSAGE: message option must be an object.');
        if (typeof this.options.isSlashGame !== 'boolean')
            throw new TypeError('INVALID_COMMAND_TYPE: isSlashGame option must be a boolean.');
    }
    /**
     *
     * @param content - The Message Content
     * @returns
     */
    async sendMessage(content) {
        if (this.options.isSlashGame)
            return await this.message.editReply(content).catch(e => { });
        else
            return await this.message.channel.send(content).catch(e => { });
    }
    /**
     * Starts the Game
     */
    async startGame() {
        if (this.options.isSlashGame || !this.message.author) {
            if (!this.message.deferred)
                await this.message.deferReply().catch(e => { });
            this.message.author = this.message.user;
            this.options.isSlashGame = true;
        }
        this.emojis = shuffleArray(this.emojis).slice(0, 8);
        this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        const embed = new diswrap_1.EmbedBuilder()
            .setColor(this.options.embed.color)
            .setTitle(this.options.embed.title)
            .setDescription(this.options.embed.description)
            .setFooter({ text: this.message.author.tag, iconURL: this.message.author.displayAvatarURL({ dynamic: true }) });
        const msg = await this.sendMessage({ embeds: [embed], components: this.getComponents(true) });
        setTimeout(async () => {
            embed.setDescription(this.options.embed.findDescription.replace('{emoji}', this.emoji));
            await msg.edit({ embeds: [embed], components: this.getComponents(false) });
            const collector = msg.createMessageComponentCollector({ idle: this.options.timeoutTime });
            collector.on('collect', async (btn) => {
                await btn.deferUpdate().catch(e => { });
                if (btn.user.id !== this.message.author.id) {
                    if (this.options.playerOnlyMessage)
                        btn.followUp({ content: formatMessage(this.options, 'playerOnlyMessage'), ephemeral: true });
                    return;
                }
                this.selected = this.emojis[parseInt(btn.customId.split('_')[1])];
                return collector.stop();
            });
            collector.on('end', async (_, reason) => {
                if (reason === 'idle' || reason === 'user')
                    return this.gameOver(msg, (reason === 'user'));
            });
        }, this.options.hideEmojiTime);
    }
    /**
     * The GameOver Event
     * @param msg - The GameOver Message
     * @param result - The End-Result
     * @returns
     */
    gameOver(msg, result) {
        const FindEmojiGame = { player: this.message.author, selectedEmoji: this.selected, correctEmoji: this.emoji };
        const resultMessage = result ? ((this.selected === this.emoji) ? 'win' : 'lose') : 'timeout';
        this.emit('gameOver', { result: resultMessage, ...FindEmojiGame });
        if (!result)
            this.selected = this.emoji;
        const embed = new diswrap_1.EmbedBuilder()
            .setColor(this.options.embed.color)
            .setTitle(this.options.embed.title)
            .setDescription(this.options[resultMessage + 'Message'].replace('{emoji}', this.emoji))
            .setFooter({ text: this.message.author.tag, iconURL: this.message.author.displayAvatarURL({ dynamic: true }) });
        return msg.edit({ embeds: [embed], components: disableButtons(this.getComponents(true)) });
    }
    /**
     * Get Components
     * @param showEmoji - The showEmoji
     * @returns
     */
    getComponents(showEmoji) {
        const components = [];
        for (let x = 0; x < 2; x++) {
            const row = new diswrap_1.ActionRowBuilder();
            for (let y = 0; y < 4; y++) {
                const buttonEmoji = this.emojis[x * 4 + y];
                const btn = new diswrap_1.ButtonBuilder().setCustomId('findEmoji_' + (x * 4 + y))
                    .setStyle(buttonEmoji === this.selected ? (this.selected === this.emoji ? diswrap_1.ButtonStyle.Success : diswrap_1.ButtonStyle.Danger) : this.options.buttonStyle);
                if (showEmoji)
                    btn.setEmoji(buttonEmoji);
                else
                    btn.setLabel('\u200b');
                row.addComponents(btn);
            }
            components.push(row);
        }
        return components;
    }
}
exports.FindEmojiGame = FindEmojiGame;
/**
 * Defines a List of available Slash Command Option Types
 * @ https://discord.com/developers/docs/interactions/application-commands
 */
var SlashCommandOptionTypes;
(function (SlashCommandOptionTypes) {
    SlashCommandOptionTypes["SUB_COMMAND"] = "SUB_COMMAND";
    SlashCommandOptionTypes["SUB_COMMAND_GROUP"] = "SUB_COMMAND_GROUP";
    SlashCommandOptionTypes["STRING"] = "STRING";
    SlashCommandOptionTypes["INTEGER"] = "INTEGER";
    SlashCommandOptionTypes["BOOLEAN"] = "BOOLEAN";
    SlashCommandOptionTypes["USER"] = "USER";
    SlashCommandOptionTypes["CHANNEL"] = "CHANNEL";
    SlashCommandOptionTypes["ROLE"] = "ROLE";
})(SlashCommandOptionTypes || (exports.SlashCommandOptionTypes = SlashCommandOptionTypes = {}));
/**
 * The `SlashCommandLoader` class.
 * This class allows you to load Discord Slash commands from files.
 * @example
 * index.js
 * const { Client, GatewayIntentBits } = require('discord.js');
   const { SlashCommandLoader } = require('discord-utilies');

   const client = new Client({ intents: [GatewayIntentBits.Guilds] });
   const token = 'YOUR_BOT_TOKEN';

   client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    // Initialize the SlashCommandLoader and load commands from a directory
    const commandLoader = new SlashCommandLoader(client);
    commandLoader.loadCommands('./commands');
   });

   client.login(token);

 * @example
   ping.js
   module.exports = {
    data: {
        name: 'ping',
        description: 'Pong!',
    },
    async execute(interaction) {
        await interaction.reply({ content: 'Ping Pong!' });
    },
};

 */
class SlashCommandLoader {
    client;
    commands;
    constructor(client) {
        this.client = client;
        this.commands = new diswrap_1.Collection();
    }
    /**
     * Load all Slash commands from the specified directory.
     * @param commandsFolder The directory where the Slash command files are located.
     */
    loadCommands(commandsFolder) {
        fs.readdir(commandsFolder, (err, files) => {
            if (err) {
                console.error('Error reading command directory:', err);
                return;
            }
            files.forEach((file) => {
                if (file.endsWith('.js') || file.endsWith('.ts')) {
                    const commandPath = `${commandsFolder}/${file}`;
                    const commandModule = require(commandPath);
                    if (typeof commandModule === 'object') {
                        const { data, execute } = commandModule; // Extract data and execute from the module
                        if (data && data.name && typeof execute === 'function') {
                            const commandName = data.name;
                            this.commands.set(commandName, { data, execute });
                            console.log(`Slash command loaded: ${commandName}`);
                        }
                        else {
                            console.log(`Error loading Slash command: ${file}`);
                        }
                    }
                    else {
                        console.log(`Error loading Slash command: ${file}`);
                    }
                }
            });
        });
        this.client.on('interactionCreate', this.handleInteraction.bind(this));
    }
    /**
     * Handle incoming interactions (Slash commands).
     * @param interaction The incoming interaction.
     */
    async handleInteraction(interaction) {
        if (!interaction.isCommand())
            return;
        const command = this.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            }
            catch (error) {
                console.error('Error executing Slash command:', error);
                await interaction.reply('An error occurred.');
            }
        }
    }
}
exports.SlashCommandLoader = SlashCommandLoader;
