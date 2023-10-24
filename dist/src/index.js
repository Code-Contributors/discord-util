"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CogManager = exports.EasyBot = exports.EasyBotEmitter = exports.easybotemitter = exports.LevelSystem = exports.LevelXPManager = exports.TotalLevelXPManager = exports.LevelSettingsManager = exports.LevelUtilsManager = exports.LevelRanksManager = exports.LevelManager = exports.LevelDatabaseManager = exports.LevelDotParser = exports.LevelFetchManager = exports.LevelingErros = exports.LevelSettingsArray = exports.LevelDefaultOptions = exports.LevelDefaultObject = exports.LevelingError = exports.LevelEmitter = exports.levelemitter = exports.CustomLogger = exports.ErrorHandler = exports.reply = exports.DataBaseManager = exports.DiscordDataBase = exports.SlashCommandLoader = exports.SlashCommandOptionTypes = exports.MemoryGame = exports.Approve = exports.shuffleArray = exports.getAlphaEmoji = exports.oppDirection = exports.move = exports.decode = exports.formatMessage = exports.getNumEmoji = exports.disableButtons = exports.BBuilder = exports.Intents = exports.Msg = void 0;
const discord_js_1 = require("discord.js");
Object.defineProperty(exports, "Intents", { enumerable: true, get: function () { return discord_js_1.GatewayIntentBits; } });
const events_1 = require("events");
var discord_js_2 = require("discord.js");
Object.defineProperty(exports, "Msg", { enumerable: true, get: function () { return discord_js_2.Message; } });
const fs = require("fs");
const fs_1 = require("fs");
/**
 * The BBuilder (Button Builder)
 */
class BBuilder extends discord_js_1.ButtonBuilder {
    /**
     *
     * @param options The Options
     */
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
    /**
     * Create a new `Approve` instance
     * @param options - The Options
     */
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
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(this.options.embed.requestColor)
                .setTitle(this.options.embed.requestTitle)
                .setDescription(formatMessage(this.options, 'requestMessage'));
            const btn1 = new discord_js_1.ButtonBuilder().setLabel(this.options.buttons.accept).setCustomId('approve_accept').setStyle(discord_js_1.ButtonStyle.Success);
            const btn2 = new discord_js_1.ButtonBuilder().setLabel(this.options.buttons.reject).setCustomId('approve_reject').setStyle(discord_js_1.ButtonStyle.Danger);
            const row = new discord_js_1.ActionRowBuilder().addComponents(btn1, btn2);
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
                const newEmbed = new discord_js_1.EmbedBuilder()
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
 * const { FindEmoji } = require('discord-util');
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
import { FindEmoji } from 'discord-util';
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
class MemoryGame extends events_1.EventEmitter {
    options;
    message;
    emojis;
    selected;
    emoji;
    /**
     * Create a new `MemoryGame`
     * @param options - The Options
     */
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
            buttonStyle: discord_js_1.ButtonStyle.Primary,
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
        const embed = new discord_js_1.EmbedBuilder()
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
        const embed = new discord_js_1.EmbedBuilder()
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
            const row = new discord_js_1.ActionRowBuilder();
            for (let y = 0; y < 4; y++) {
                const buttonEmoji = this.emojis[x * 4 + y];
                const btn = new discord_js_1.ButtonBuilder().setCustomId('findEmoji_' + (x * 4 + y))
                    .setStyle(buttonEmoji === this.selected ? (this.selected === this.emoji ? discord_js_1.ButtonStyle.Success : discord_js_1.ButtonStyle.Danger) : this.options.buttonStyle);
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
exports.MemoryGame = MemoryGame;
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
   const { SlashCommandLoader } = require('discord-util');

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
    /**
     * Create a new `SlashCommandLoader`
     * @param client - The Client (Bot)
     */
    constructor(client) {
        this.client = client;
        this.commands = new discord_js_1.Collection();
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
/**
 * This is the `DiscordDataBase`. With this Class you can manage Databases for your Discord Bot.
 * @example
 *const { Client, GatewayIntentBits } = require('discord.js');
const { DiscordDataBase } = require('discord-utilies');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const token = 'BOT TOKEN';

const databasePath = 'bot_database.json';

const database = new DiscordDataBase(databasePath);

client.on('ready', () => {
  console.log(`${client.user.tag} is ready`);
});

client.on('messageCreate', (message) => {
  if (message.content.startsWith('!setdata')) {
    const args = message.content.split(' ');
    if (args.length === 3) {
      const key = args[1];
      const value = args[2];
      database.set(key, value);
      message.channel.send(`Saved Data: ${key} -> ${value}`);
    }
  }

  if (message.content.startsWith('!getdata')) {
    const key = message.content.split(' ')[1];
    const value = database.get(key);
    message.channel.send(`Got Data: ${key} -> ${value}`);
  }

  if (message.content.startsWith('!deletedata')) {
    const key = message.content.split(' ')[1];
    database.delete(key);
    message.channel.send(`Deleted Data: ${key}`);
  }
});

client.login(token);
 */
class DiscordDataBase {
    databasePath;
    data;
    /**
     * Create a new `DiscordDataBase` instance
     * @param path - The Path to the Database
     */
    constructor(path) {
        this.databasePath = path;
        this.data = this.loadDatabase();
    }
    /**
     * The `loadDatabase` Function. This loads your Data
     * @returns
     */
    loadDatabase() {
        try {
            const rawData = fs.readFileSync(this.databasePath, 'utf8');
            return JSON.parse(rawData);
        }
        catch (error) {
            return {};
        }
    }
    /**
     * The `saveDatabase` Function. This save your Data
     */
    saveDatabase() {
        fs.writeFileSync(this.databasePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }
    /**
     * The `set` Function. This sets Data to your Database
     * @param key - The Key
     * @param value - The Value
     */
    set(key, value) {
        this.data[key] = value;
        this.saveDatabase();
    }
    /**
     * The `get` Function. With this you can get/load Data from your DataBase
     * @param key - The Key
     * @returns
     */
    get(key) {
        return this.data[key];
    }
    /**
     * The `delete` Funtion. This deletes Data in your Database
     * @param key - The Key
     */
    delete(key) {
        delete this.data[key];
        this.saveDatabase();
    }
}
exports.DiscordDataBase = DiscordDataBase;
/**
 * The `DataBaseManager` Class.
 * This class allows you to manage databases, create, delete and interact with them.
 * @example
 * const databasePath = 'my_database.json';
const databaseManager = new DataBaseManager(databasePath);

// Create the database (if it doesn't exist)
databaseManager.createDatabase();

// Save data into the database
databaseManager.setData('user123', { name: 'John', age: 30 });

// Retrieve data from the database
const userData = databaseManager.getData('user123');
console.log('User data:', userData);

// Delete data from the database
databaseManager.deleteData('user123');

// Delete the database (when no longer needed)
databaseManager.deleteDatabase();
 */
class DataBaseManager {
    databasePath;
    /**
     * Create a new `DataBaseManager` instance.
     * @param databasePath - The Path to the Database File.
     */
    constructor(databasePath) {
        this.databasePath = databasePath;
    }
    /**
     * Create a new Database file
     */
    createDatabase() {
        if (!fs.existsSync(this.databasePath)) {
            fs.writeFileSync(this.databasePath, JSON.stringify({}, null, 2), 'utf-8');
            console.log('Database created');
        }
        else {
            console.log('Database already excist');
        }
    }
    /**
     * Delete the Database file
     */
    deleteDatabase() {
        if (fs.existsSync(this.databasePath)) {
            fs.unlinkSync(this.databasePath);
            console.log('Database deleted');
        }
        else {
            console.log('Database already exists');
        }
    }
    /**
     * Get data from the database by key.
     * @param key - The key to retrieve data.
     * @returns The data associated with the given key
     */
    getData(key) {
        const databaseContent = this.loadDatabase();
        return databaseContent[key];
    }
    /**
     Save data into the database.
     * @param key - The key to associate with the data.
     * @param value - The data to save.
     */
    setData(key, value) {
        const databaseContent = this.loadDatabase();
        databaseContent[key] = value;
        this.saveDatabase(databaseContent);
    }
    /**
     * Delete data from the database by key.
     * @param key - The key to delete data.
     */
    deleteData(key) {
        const databaseContent = this.loadDatabase();
        delete databaseContent[key];
        this.saveDatabase(databaseContent);
    }
    /**
     * Private Helper Method 1
     * @returns
     */
    loadDatabase() {
        if (fs.existsSync(this.databasePath)) {
            const data = fs.readFileSync(this.databasePath, 'utf8');
            return JSON.parse(data);
        }
        return {};
    }
    /**
     * Private Helper Method 2
     * @param data - The Data
     */
    saveDatabase(data) {
        fs.writeFileSync(this.databasePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}
exports.DataBaseManager = DataBaseManager;
/**
 * The `reply` Function. With this you can easily reply Messages
 * @param options - The Reply Options
 */
async function reply(options) {
    if (!options.interaction)
        throw new TypeError("You must input a valid interaction!");
    if (!options.message)
        throw new TypeError("You must input a valid message!");
    await options.interaction.reply(options.message);
    await options.msg.reply(options.message);
    console.log(options.message, options.interaction.user.id);
}
exports.reply = reply;
/**
 * The `ErrorHandler` Class.
 * This class provides methods for handling and reporting errors.
 */
class ErrorHandler {
    /**
     * Log an Error Message to the console
     * @param error - The Error Message or Object to log
     */
    static logError(error) {
        console.error("Error:", error);
    }
    /**
     * Send an error message to a specific channel.
     * @param channel - The TextChannel to send the error message to.
     * @param error - The error message or object to send.
     */
    static sendErrorToChannel(channel, error) {
        channel.send(`The ErrorHandler have to report the Error: ${error}`);
    }
    /**
     * Handle an error and provide a user-friendly response to an interaction.
     * @param interaction - The CommandInteraction to respond to.
     * @param error - The error message or object to handle.
     */
    static handleInteractionError(interaction, error) {
        const errorMessage = "An error occurred while processing your request.";
        interaction.reply(errorMessage);
        console.error("Error in interaction:", error);
    }
    /**
     * Handle an error and provide a user-friendly response to a regular message.
     * @param channel - The TextChannel to send the response to.
     * @param error - The error message or object to handle.
     */
    static handleTextChannelError(channel, error) {
        const errorMessage = "An error occurres while processing your request.";
        channel.send(errorMessage);
        console.error("Error in text channel:", error);
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * The `CustomLogger` Class allows you to create and display custom log messages
 * @example
 * // Example of using the CustomLogger
const logger = new CustomLogger('MyApp');

logger.info('This is an information message.');
logger.warn('This is a warning.');
logger.error('This is an error message.');
 */
class CustomLogger {
    prefix;
    /**
     * Creates a new instance of the `CustomLogger`.
     * @param prefix - An optional prefix to prepend to all log messages.
     */
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    /**
     * Logs an information message.
     * @param message - The message to be logged.
     */
    info(message) {
        this.log(`[INFO] ${message}`);
    }
    /**
     * Logs an error message.
     * @param message - The error message to be logged.
     */
    error(message) {
        this.log(`[ERROR] ${message}`);
    }
    /**
     * Logs a warning.
     * @param message - The warning to be logged.
     */
    warn(message) {
        this.log(`[WARNING] ${message}`);
    }
    /**
    * Internal logging of the message.
    * @param message - The message to log.
     */
    log(message) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} ${this.prefix}${message}`);
    }
}
exports.CustomLogger = CustomLogger;
/**
 * The Level Emitter
 */
exports.levelemitter = new events_1.EventEmitter();
/**
 * Simple Level event emitter with only important emitter methods.
 * @private
 */
class LevelEmitter {
    constructor() { }
    /**
     * Listens to the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    on(event, listener) {
        exports.levelemitter.on(event, listener);
        return this;
    }
    /**
     * Listens to the event only for once.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    once(event, listener) {
        exports.levelemitter.once(event, listener);
        return this;
    }
    /**
     * Emits the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {LevelEvents[K][]} args Listener arguments.
     */
    emit(event, ...args) {
        return exports.levelemitter.emit(event, ...args);
    }
}
exports.LevelEmitter = LevelEmitter;
/**
 * The `LevelingError` Class
 */
class LevelingError extends Error {
    /**
     * Creates an `LevelingError` instance.
     * @param {String | Error} message Error message.
     */
    constructor(message) {
        if (message instanceof Error) {
            super(message.message);
            Error.captureStackTrace(this, this.constructor);
        }
        else
            super(message);
        /***
         * The Name of the Error (Error Name)
         * @type {String}
         */
        this.name = 'LevelingError';
    }
}
exports.LevelingError = LevelingError;
/**
 * This is the Structure of the JSON Database File
 */
exports.LevelDefaultObject = {
    userData: {
        id: '',
        username: '',
        tag: '',
        discriminator: ''
    },
    xp: 0,
    totalXP: 0,
    multiplier: 1,
    level: 1,
    maxXP: 300,
    difference: 300
};
/**
 * The Default Level Options
 */
exports.LevelDefaultOptions = {
    storagePath: './leveling.json',
    checkStorage: true,
    xp: 5,
    maxXP: 300,
    multiplier: 1,
    status: true,
    ignoreBots: true,
    lockedChannels: [],
    ignoredUsers: [],
    ignoredGuilds: [],
    filter: () => true,
    updater: {
        checkUpdates: true,
        upToDateMessage: true
    },
    errorHandler: {
        handleErrors: true,
        attempts: 5,
        time: 3000
    },
    optionsChecker: {
        ignoreInvalidTypes: false,
        ignoreUnspecifiedOptions: false,
        ignoreInvalidOptions: false,
        showProblems: false,
        sendLog: false,
        sendSuccessLog: false
    }
};
/**
 * The Level Setting Array(s)
 */
exports.LevelSettingsArray = [
    'xp',
    'maxXP',
    'multiplier',
    'status',
    'ignoredUsers',
    'lockedChannels',
    'ignoreBots',
    'filter'
];
/**
 * This are the Leveling Errors
 */
exports.LevelingErros = {
    noClient: 'NO_CLIENT[1]: Specify the bot client.',
    invalidClient: 'INVALID_CLIENT[2]: Specified client is invalid.',
    notReady: 'NOT_READY[3]: The module is not ready to work.',
    noDependencies: 'NO_DEPENDENCIES[4]:Cannot find dependencies in your \'package.json\' file.',
    noDiscordJS: 'NO_DISCORDJS: Discord.js not found!',
    oldNodeVersion: 'OLD_NODEJS_VERSION[5]: This module is supporting only Node.js v16.6.0 or higher. Installed version is ',
    oldDJSVersion: 'OLD_DJS_VERSION[6]: This module is supporting only Discord.js v13.1.0 or higher. Installed version is ',
    invalidStorage: 'INVALID_STORAGE[7]: Storage file is not valid.',
    wrongStorageData: 'WRONG_STORAGE_DATA[8]: Storage file contains wrong data.',
    invalidTypes: {
        level: 'INVALID_TYPE_LEVEL[9]: Level must be a number or string. Received type: ',
        xp: 'INVALID_TYPE_XP[12]: XP must be a number or string. Received type: ',
        member: 'INVALID_TYPE_MEMBER[11]: Member must be a string or an instance of GuildMember or User. Received type: ',
        guild: 'INVALID_TYPE_GUILD[12]: Guild must be a string or an instance of Guild. Received type: ',
        multiplier: 'INVALID_TYPE_MULTIPLIER[13]: Multiplier must be a string. Received type: ',
        value: 'INVALID_TYPE_VALUE[14]: Value must be specified. Received: '
    },
    settingsManager: {
        invalidKey: `INVALID_KEY[15]: You have specified the incorrect settings key. It must be one of the following values:\n${exports.LevelSettingsArray.map(x => `'${x}'`).join(', ')}.\nReceived: `,
        valueNotFound(setting, value) {
            return `Cannot find the value "${value}", in a setting "${setting}".`;
        }
    },
    databaseManager: {
        invalidTypes: {
            key: 'INVALID_TYPE_KEY[16]: Key must be a string. Received type: ',
            target: {
                number: 'INVALID_TARGET_NUMBER[17]: Target is not a number. Received type: ',
                array: 'INVALID_TARGET_ARRAY[18]: Target is not an array. Received type: '
            },
            value: {
                number: 'INVALID_VALUE_NUMBER[19]: Value is not a number. Received type: ',
                array: 'INVALID_VALUE_ARRAY[20]: Value is not an array. Received type: '
            }
        }
    },
    sendMessage: {
        invalidTypes: {
            msg: 'INVALID_TYPE_MSG[21]: The message must be a string or an object with message options or instance of EmbedBuilder or AttachmentBuilder. Received type: ',
            channel: 'INVALID_TYPE_CHANNEL[22]: The channel must be a string. Received type: ',
        },
        channelNotFound: 'CHANNEL_NOT_FOUND[23]: Cannot find the specified channel.',
        invalidChannelType: 'INVALID_CHANNEL_TYPE[24]: Cannot send a message in a voice channel or category.'
    },
    lockedChannels: {
        invalidTypes: 'INVALID_TYPE_LOCKED_CHANNEL[25]: The elements of array of locked channels must be a string. Received: ',
        invalidChannels(channelsArray) {
            if (channelsArray.length == 1)
                return `Cannot find the specified channel: ${channelsArray[0]}`;
            return `Cannot find the ${channelsArray.length} specified channels: ${channelsArray.join(', ')}`;
        }
    },
    ignoredUsers: {
        invalidTypes: 'INVALID_TYPE_IGNORED_USERS[26]: The elements of array of ignored users must be a string. Received: ',
        invalidUsers(usersArray) {
            if (usersArray.length == 1)
                return `Cannot find the specified user: ${usersArray[0]}`;
            return `Cannot find the ${usersArray.length} specified users: ${usersArray.join(', ')}`;
        }
    },
    ignoredGuilds: {
        invalidTypes: 'INVALID_TYPE_IGNORED_GUILDS[27]: The elements of array of ignored guilds must be a string. Received: ',
        invalidGuilds(guildsArray) {
            if (guildsArray.length == 1)
                return `Cannot find the specified guild: ${guildsArray[0]}`;
            return `Cannot find the ${guildsArray.length} specified guilds: ${guildsArray.join(', ')}`;
        }
    },
    reservedName(name) {
        return `'${name}' is a reserved storage file name. You cannot use it.`;
    }
};
const errors = exports.LevelingErros;
/**
 * The `LevelFetchManager`. This fetchs Levels etc.
 */
class LevelFetchManager {
    /**
     * Storage Path.
     * @type {String}
     * @private
     */
    storagePath;
    /**
     * Fetch manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options) {
        this.storagePath = options.storagePath || './leveling.json';
    }
    /**
     * Gets the amount of XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    fetchXP(member, guild) {
        const data = this.fetchAll();
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const guildData = data[botGuild];
        const memberData = guildData?.[user];
        const xp = memberData?.xp;
        return (xp || 0);
    }
    /**
    * Gets the amount of total XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchTotalXP(member, guild) {
        const data = this.fetchAll();
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const guildData = data[botGuild];
        const memberData = guildData?.[user];
        const totalXP = memberData?.totalXP;
        return (totalXP || 0);
    }
    /**
    * Gets the amount of levels for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchLevels(member, guild) {
        const data = this.fetchAll();
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const guildData = data[botGuild];
        const memberData = guildData?.[user];
        const levels = memberData?.level;
        return (levels || 0);
    }
    /**
    * Gets the amount of max XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchMaxXP(member, guild) {
        const data = this.fetchAll();
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const guildData = data[botGuild];
        const memberData = guildData?.[user];
        const maxXP = memberData?.maxXP;
        return (maxXP || 0);
    }
    /**
    * Gets the difference between max XP and user's XP.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchDifference(member, guild) {
        const data = this.fetchAll();
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const guildData = data[botGuild];
        const memberData = guildData?.[user];
        const difference = memberData?.difference;
        return (difference || 0);
    }
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    fetchAll() {
        const isFileExisting = (0, fs_1.existsSync)(this.storagePath);
        if (!isFileExisting)
            (0, fs_1.writeFileSync)(this.storagePath, '{}');
        const fileData = (0, fs_1.readFileSync)(this.storagePath);
        const stringData = fileData.toString();
        return JSON.parse(stringData);
    }
}
exports.LevelFetchManager = LevelFetchManager;
/**
 * Level Dot Parser
 * @private
 */
class LevelDotParser {
    options;
    storagePath;
    fetcher;
    /**
     * Leveling constructor options object. There's only needed options object properties for this manager to work properly.
     * @param {Object} options Constructor options object.
     * @param {String} options.storagePath Full path to a JSON file. Default: './leveling.json'.
     */
    constructor(options) {
        /**
         * Leveling constructor options object.
         * @private
         * @type {LevelingOptions}
         */
        this.options = options;
        /**
         * Fetch manager methods object.
         * @type {FetchManager}
         * @private
         */
        this.fetcher = new LevelFetchManager(options);
        if (!options.storagePath)
            this.storagePath = exports.LevelDefaultOptions.storagePath;
    }
    /**
     * Parses the key and fetches the value from database.
     * @param {String} key The key in database.
     * @returns {any | false} The data from database or 'false' if failed to parse or 'null' if nothing found.
     */
    parse(key) {
        let parsed = this.fetcher.fetchAll();
        if (!key)
            return false;
        if (typeof key !== 'string')
            return false;
        const keys = key.split('.');
        let tmp = parsed;
        for (let i = 0; i < keys.length; i++) {
            if ((keys.length - 1) == i) {
                parsed = tmp?.[keys[i]] || null;
            }
            tmp = tmp?.[keys[i]];
        }
        return parsed || null;
    }
    /**
     * Parses the key and sets the data in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set.
     * @returns {Boolean} If set successfully: true; else: false
     */
    set(key, value) {
        const { isObject } = this;
        let storageData = this.fetcher.fetchAll();
        if (!key)
            return false;
        if (typeof key !== 'string')
            return false;
        if (value == undefined)
            return false;
        if (typeof value == 'function')
            return false;
        const keys = key.split('.');
        let tmp = storageData;
        for (let i = 0; i < keys.length; i++) {
            if ((keys.length - 1) == i) {
                tmp[keys[i]] = value;
            }
            else if (!isObject(tmp[keys[i]])) {
                tmp[keys[i]] = {};
            }
            tmp = tmp?.[keys[i]];
        }
        (0, fs_1.writeFileSync)(this.options.storagePath || './leveling.json', JSON.stringify(storageData, null, '\t'));
        return true;
    }
    /**
     * Parses the key and removes the data from database.
     * @param {String} key The key in database.
     * @returns {Boolean} If removed successfully: true; else: false
     */
    remove(key) {
        const { isObject } = this;
        let storageData = this.fetcher.fetchAll();
        if (!key)
            return false;
        if (typeof key !== 'string')
            return false;
        const data = this.parse(key);
        if (data == null)
            return false;
        const keys = key.split('.');
        let tmp = storageData;
        for (let i = 0; i < keys.length; i++) {
            if ((keys.length - 1) == i) {
                delete tmp?.[keys[i]];
            }
            else if (!isObject(tmp?.[keys[i]])) {
                tmp[keys[i]] = {};
            }
            tmp = tmp[keys[i]];
        }
        (0, fs_1.writeFileSync)(this.options.storagePath || './leveling.json', JSON.stringify(storageData, null, '\t'));
        return true;
    }
    /**
     * Checks for is the item object and returns it.
     * @param {any} item The item to check.
     * @returns {Boolean} Is the item object or not.
    */
    isObject(item) {
        return !Array.isArray(item)
            && typeof item == 'object'
            && item !== null;
    }
}
exports.LevelDotParser = LevelDotParser;
/**
 * Level Database manager methods class.
 */
class LevelDatabaseManager {
    /**
     * Dor Parser.
     * @type {DotParser}
     * @private
     */
    parser;
    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    fetcher;
    /**
     * Database manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options) {
        this.fetcher = new LevelFetchManager(options);
        this.parser = new LevelDotParser({ storagePath: options.storagePath || './leveling.json', errorHandler: { attempts: 5, handleErrors: true, time: 3000 } });
    }
    /**
     * Gets a list of keys in database.
     * @param {String} key The key in database.
     * @returns {string[]} An array with all keys in database or 'null' if nothing found.
     */
    keyList(key) {
        const storageData = this.fetcher.fetchAll();
        const data = this.fetch(key);
        if (!key || typeof key !== 'string')
            return Object.keys(storageData).filter(x => storageData[x]);
        if (data == null)
            return null;
        const keys = Object.keys(data);
        return keys.filter(x => data[x] !== undefined && data[x] !== null);
    }
    /**
     * Sets data in a property in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set in property.
     * @returns {Boolean} If set successfully: true; else: false
     */
    set(key, value) {
        if (!key)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (value == undefined)
            return false;
        return this.parser.set(key, value);
    }
    /**
     * Adds a number to a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to add.
     * @returns {Boolean} If added successfully: true; else: false
     */
    add(key, value) {
        const data = this.parser.parse(key);
        if (!key)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (isNaN(value))
            throw new LevelingError(errors.databaseManager.invalidTypes.value.number + typeof value);
        if (isNaN(data))
            throw new LevelingError(errors.databaseManager.invalidTypes.target.number + typeof data);
        const numData = Number(data);
        const numValue = Number(value);
        return this.set(key, numData + numValue);
    }
    /**
     * Subtracts a number from a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to subtract.
     * @returns {Boolean} If set successfully: true; else: false
     */
    subtract(key, value) {
        const data = this.parser.parse(key);
        if (!key)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (isNaN(value))
            throw new LevelingError(errors.databaseManager.invalidTypes.value.number + typeof value);
        if (isNaN(data))
            throw new LevelingError(errors.databaseManager.invalidTypes.target.number + typeof data);
        const numData = Number(data);
        const numValue = Number(value);
        return this.set(key, numData - numValue);
    }
    /**
     * Fetches the data from the storage file.
     * @param {String} key The key in database.
     * @returns {any | false} Value from the specified key or 'false' if failed to read or 'null' if nothing found.
     */
    fetch(key) {
        if (!key)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        return this.parser.parse(key);
    }
    /**
     * Removes the property from the existing object in database.
     * @param {String} key The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    remove(key) {
        if (!key)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        return this.parser.remove(key);
    }
    /**
     * Pushes a value to a specified array from the database.
     * @param {String} key The key in database.
     * @param {any} value The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    push(key, value) {
        if (!key)
            return false;
        if (value == undefined)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        let data = this.fetch(key) || [];
        if (!Array.isArray(data) && !data.length)
            throw new LevelingError(errors.databaseManager.invalidTypes.target.array + typeof data);
        data.push(value);
        return this.set(key, data);
    }
    /**
     * Removes an element from a specified array in the database.
     * @param {String} key The key in database.
     * @param {Number} index The index in the array.
     * @returns {Boolean} If cleared: true; else: false.
     */
    removeElement(key, index) {
        if (!key)
            return false;
        if (index == undefined)
            return false;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        let data = this.fetch(key);
        if (!Array.isArray(data))
            throw new LevelingError(errors.databaseManager.invalidTypes.target.array + typeof data);
        data.splice(index, 1);
        return this.set(key, data);
    }
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    all() {
        return this.fetcher.fetchAll();
    }
}
exports.LevelDatabaseManager = LevelDatabaseManager;
/**
 * Level manager methods class.
 * @extends {LevelEmitter}
 */
class LevelManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * Leveling manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options) {
        super();
        this.database = new LevelDatabaseManager(options);
    }
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of levels.
     */
    get(member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const level = this.database.fetch(`${botGuild}.${user}.level`);
        return level;
    }
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(level, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('setLevel', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp: userLevelData.xp,
            totalXP: userLevelData.totalXP,
            level,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        });
        return this.database.set(`${botGuild}.${user}.level`, level);
    }
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(level, member, guild, onMessage = false) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userData = this.database.fetch(`${botGuild}.${user}`);
        if (!onMessage)
            this.emit('addLevel', {
                guildID: botGuild,
                userID: user,
                xp: userData.xp,
                totalXP: userData.totalXP,
                level: userData.level + level,
                maxXP: userData.maxXP,
                difference: userData.difference,
                multiplier: userData.multiplier,
                onMessage
            });
        return this.database.add(`${botGuild}.${user}.level`, level);
    }
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(level, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('subtractLevel', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp: userLevelData.xp,
            totalXP: userLevelData.totalXP,
            level: userLevelData.level - level,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        });
        return this.database.subtract(`${botGuild}.${user}.level`, level);
    }
}
exports.LevelManager = LevelManager;
/**
 * Level Ranks manager methods class.
 */
class LevelRanksManager {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    client;
    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options, client) {
        this.client = client;
        this.database = new LevelDatabaseManager(options);
    }
    /**
    * Fetches the user's rank.
    * @param {String | GuildMember | User} member Member or it's ID
    * @param {String | Guild} guild Guild or it's ID
    * @returns {RankData} User's rank object.
    */
    get(member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const rank = this.database.fetch(`${botGuild}.${user}`);
        if (!rank)
            return {
                userData: null,
                xp: null,
                totalXP: null,
                multiplier: null,
                level: null,
                maxXP: null,
                difference: null,
            };
        return rank;
    }
    /**
     * Shows a level leaderboard for specified server.
     * @param {String | Guild} guild Guild or it's ID
     * @returns {LeaderboardData[]} Sorted leaderboard array.
     */
    leaderboard(guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const botGuild = isGuild ? guild.id : guild.toString();
        const serverData = this.database.fetch(`${botGuild}`);
        let leaderboard = [];
        if (!serverData)
            return [];
        let users = Object.keys(serverData);
        let ranks = Object.values(serverData);
        for (let i in users)
            leaderboard.push({
                userID: users[i],
                xp: ranks[i].xp,
                totalXP: ranks[i].totalXP,
                level: ranks[i].level,
                maxXP: ranks[i].maxXP,
                difference: ranks[i].difference,
                multiplier: ranks[i].multiplier,
                user: this.client.users.cache.get(users[i]),
                userData: ranks[i].userData
            });
        return leaderboard.sort((a, b) => b.totalXP - a.totalXP).filter(x => !isNaN(x.totalXP));
    }
    /**
    * Sets the multiplier for specified user.
    * @param {Number} multiplier The multimplier number to set.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Boolean} If set successfully: true; else: false
    */
    setMultiplier(multiplier, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (isNaN(multiplier))
            throw new LevelingError(errors.invalidTypes.multiplier + typeof multiplier);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        return this.database.set(`${botGuild}.${user}.multiplier`, multiplier);
    }
}
exports.LevelRanksManager = LevelRanksManager;
/**
 * Level Utils manager methods class.
 */
class LevelUtilsManager {
    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    fetcher;
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    client;
    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    options;
    /**
     * Utils manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options, client) {
        this.options = options;
        this.client = client;
        this.database = new LevelDatabaseManager(options);
        this.fetcher = new LevelFetchManager(options);
    }
    /**
    * Checks for if the module is up to date.
    * @returns {Promise<VersionData>} This method will show is the module updated, latest version and installed version.
    */
    async checkUpdates() {
        const version = require('../../package.json').version;
        const packageData = await fetch('https://registry.npmjs.com/discord-leveling-super')
            .then((text) => text.json());
        if (version == packageData['dist-tags'].latest)
            return {
                updated: true,
                installedVersion: version,
                packageVersion: packageData['dist-tags'].latest
            };
        return {
            updated: false,
            installedVersion: version,
            packageVersion: packageData['dist-tags'].latest
        };
    }
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    all() {
        return this.fetcher.fetchAll();
    }
    /**
     * Writes the data to file.
     * @param {String} path File path to write.
     * @param {any} data Any data to write
     * @returns {Boolean} If successfully written: true; else: false.
     */
    write(path, data) {
        if (!path)
            return false;
        if (!data)
            return false;
        const fileData = (0, fs_1.readFileSync)(path).toString();
        if (fileData == data)
            return false;
        (0, fs_1.writeFileSync)(this.options.storagePath || './leveling.json', JSON.stringify(data, null, '\t'));
        return true;
    }
    /**
     * Clears the storage file.
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    clearStorage() {
        const data = this.all();
        const stringData = String(data);
        if (stringData == '{}')
            return false;
        this.write(this.options.storagePath || './leveling.json', '{}');
        return true;
    }
    /**
    * Fully removes the guild from database.
    * @param {String} guildID Guild ID
    * @returns {Boolean} If cleared successfully: true; else: false
    */
    removeGuild(guildID) {
        const data = this.fetcher.fetchAll();
        const guild = data[guildID];
        if (!guildID)
            return false;
        if (!guild)
            return false;
        this.database.remove(guildID);
        return true;
    }
    /**
     * Removes the user from database.
     * @param {String} memberID Member ID
     * @param {String} guildID Guild ID
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    removeUser(memberID, guildID) {
        const data = this.fetcher.fetchAll();
        const guild = data[guildID];
        const user = guild?.[memberID];
        if (!guildID)
            return false;
        if (!guild)
            return false;
        if (!user)
            return false;
        this.database.remove(`${guildID}.${memberID}`);
        return true;
    }
    /**
     * Sets the default user object for the specified member.
     * @param {String} memberID Member ID.
     * @param {String} guildID Guild ID.
     * @param {RankData} object Custom rank object to set.
     * @returns {Boolean} If reset is successful: true; else: false.
     */
    reset(memberID, guildID, object) {
        const dataObject = exports.LevelDefaultObject;
        if (!guildID)
            return false;
        if (!memberID)
            return false;
        if (object)
            return this.database.set(`${guildID}.${memberID}`, object);
        const user = this.client.users.cache.get(memberID);
        if (!user)
            return false;
        dataObject.userData = {
            id: memberID,
            username: user.username,
            tag: user.tag,
            discriminator: user.discriminator
        };
        dataObject.xp = 0;
        dataObject.totalXP = 0;
        return this.database.set(`${guildID}.${memberID}`, dataObject);
    }
    /**
     * Returns a rank object with specified values.
     * @param {LevelData} options Rank object to use.
     * @returns {LevelData} Rank object with specified values.
     */
    getRankObject(options) {
        const isDefined = (val) => val !== undefined ? val : false;
        if (!options)
            return {
                userData: null,
                guildID: null,
                userID: null,
                xp: null,
                totalXP: null,
                level: null,
                maxXP: null,
                difference: null,
                multiplier: null
            };
        return {
            userData: isDefined(options.userData) || null,
            guildID: isDefined(options.guildID) || null,
            userID: isDefined(options.userID) || null,
            xp: isDefined(options.xp) || null,
            totalXP: isDefined(options.totalXP) || null,
            level: isDefined(options.level) || null,
            maxXP: isDefined(options.maxXP) || null,
            difference: isDefined(options.difference) || null,
            multiplier: isDefined(options.multiplier) || null
        };
    }
    /**
     * Returns the type or instance of specified item.
     * @param {any} item The item to get the type of.
     * @returns {String} Type or instance of the item.
     */
    typeOf(item) {
        return item === null ?
            'null' :
            item === undefined ?
                'undefined' :
                item.constructor.name && item.name
                    ? item.name :
                    item.constructor.name;
    }
    /**
    * Checks for is the item object and returns it.
    * @param {any} item The item to check.
    * @returns {Boolean} Is the item object or not.
    */
    isObject(item) {
        return !Array.isArray(item)
            && typeof item == 'object'
            && item !== null;
    }
    /**
     * Checks the Leveling options object, fixes the problems in it and returns the fixed options object.
     * @param {CheckerOptions} options Option checker options.
     * @param {LevelingOptions} levelingOptions Leveling options object to check.
     * @returns {LevelingOptions} Fixed Leveling options object.
    */
    checkOptions(options = {}, levelingOptions) {
        const unset = (obj, key) => {
            const keys = key.split('.');
            let tmp = obj;
            for (let i = 0; i < keys.length; i++) {
                if ((keys.length - 1) == i) {
                    delete tmp[keys[i]];
                }
                else if (!this.isObject(tmp[keys[i]])) {
                    tmp[keys[i]] = {};
                }
                tmp = tmp[keys[i]];
            }
        };
        let problems = [];
        let output = {};
        const keys = Object.keys(exports.LevelDefaultOptions);
        const optionKeys = Object.keys(levelingOptions || {});
        if (typeof levelingOptions !== 'object' && !Array.isArray(levelingOptions)) {
            problems.push('options is not an object. Received type: ' + typeof levelingOptions);
            output = exports.LevelDefaultOptions;
        }
        else {
            if (!optionKeys.length) {
                problems.push('options object is empty.');
                return exports.LevelDefaultOptions;
            }
            for (let i of keys) {
                if (levelingOptions[i] == undefined) {
                    output[i] = exports.LevelDefaultOptions[i];
                    if (!options.ignoreUnspecifiedOptions)
                        problems.push(`options.${i} is not specified.`);
                }
                else {
                    output[i] = levelingOptions[i];
                }
                for (let y of Object.keys(exports.LevelDefaultOptions[i])) {
                    if (levelingOptions[i]?.[y] == undefined || output[i]?.[y] == undefined) {
                        try {
                            output[i][y] = exports.LevelDefaultOptions[i][y];
                        }
                        catch (_) { }
                        if (!options.ignoreUnspecifiedOptions && isNaN(Number(y)))
                            problems.push(`options.${i}.${y} is not specified.`);
                    }
                    else { }
                }
                if (typeof output[i] !== typeof exports.LevelDefaultOptions[i]) {
                    if (!options.ignoreInvalidTypes) {
                        if (i == 'xp') {
                            if (typeof output[i] !== 'number' && !Array.isArray(output[i])) {
                                problems.push(`options.${i} is not a ${i == 'xp' ? 'number or array' : typeof exports.LevelDefaultOptions[i]}. Received type: ${typeof output[i]}.`);
                                output[i] = exports.LevelDefaultOptions[i];
                            }
                        }
                        else {
                            problems.push(`options.${i} is not a ${typeof exports.LevelDefaultOptions[i]}. Received type: ${typeof output[i]}.`);
                            output[i] = exports.LevelDefaultOptions[i];
                        }
                    }
                }
                else { }
                for (let y of Object.keys(exports.LevelDefaultOptions[i])) {
                    if (typeof output[i]?.[y] !== typeof exports.LevelDefaultOptions[i][y]) {
                        if (!options.ignoreInvalidTypes)
                            problems.push(`options.${i}.${y} is not a ${typeof exports.LevelDefaultOptions[i][y]}. Received type: ${typeof output[i][y]}.`);
                        output[i][y] = exports.LevelDefaultOptions[i][y];
                    }
                    else { }
                }
            }
            for (let i of optionKeys) {
                const defaultIndex = keys.indexOf(i);
                const objectKeys = Object.keys(levelingOptions?.[i]);
                for (let y of objectKeys) {
                    const allKeys = Object.keys(exports.LevelDefaultOptions[i] || '0');
                    const index = allKeys.indexOf(y);
                    if (!allKeys[index] && isNaN(Number(y))) {
                        problems.push(`options.${i}.${y} is an invalid option.`);
                        unset(output, `${i}.${y}`);
                    }
                }
                if (!keys[defaultIndex]) {
                    unset(output, i);
                    problems.push(`options.${i} is an invalid option.`);
                }
            }
        }
        if (options.sendLog) {
            if (options.showProblems)
                console.log(`Checked the options: ${problems.length ?
                    `${problems.length} problems found:\n\n${problems.join('\n')}` : '0 problems found.'}`);
            if (options.sendSuccessLog && !options.showProblems)
                console.log(`Checked the options: ${problems.length} ${problems.length == 1 ? 'problem' : 'problems'} found.`);
        }
        if (output == exports.LevelDefaultOptions)
            return levelingOptions;
        else
            return output;
    }
}
exports.LevelUtilsManager = LevelUtilsManager;
/**
 * Level Settings manager methods class.
 */
class LevelSettingsManager {
    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    options;
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * Utils Manager.
     * @type {UtilsManager}
     * @private
     */
    utils;
    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options, client) {
        this.options = options;
        this.database = new LevelDatabaseManager(options);
        this.utils = new LevelUtilsManager(options, client);
    }
    /**
     * Gets the specified setting from the database.
     *
     * Note: If the server don't have any setting specified,
     * the module will take the values from the
     * options object or default options object.
     *
     * @param {keyof SettingsTypes} key The setting to fetch.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes[K]} The setting from the database.
     */
    get(key, guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (!exports.LevelSettingsArray.includes(key))
            throw new LevelingError(errors.settingsManager.invalidKey + key);
        const botGuild = isGuild ? guild.id : guild.toString();
        const data = this.all(botGuild);
        const dbValue = data[key];
        return dbValue;
    }
    /**
     * Changes the specified setting.
     *
     * Note: If the server don't have any setting specified,
     * the module will take the values from the
     * options object or default options object.
     *
     * @param {keyof SettingsTypes} key The setting to change.
     * @param {SettingsTypes[K]} value The value to set.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    set(key, value, guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (value == undefined)
            throw new LevelingError(errors.invalidTypes.value + typeof value);
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (!exports.LevelSettingsArray.includes(key))
            throw new LevelingError(errors.settingsManager.invalidKey + key);
        const botGuild = isGuild ? guild.id : guild.toString();
        if (key == 'filter')
            this.database.set(`${botGuild}.settings.${key}`, value.toString());
        else
            this.database.set(`${botGuild}.settings.${key}`, value);
        return this.all(botGuild);
    }
    /**
    * Pushes the element in a setting's array.
    *
    * Note: If the server don't have any setting specified,
    * the module will take the values from the
    * options object or default options object.
    *
    * @param {keyof SettingsArrays} key The setting to change.
    * @param {SettingsArrays[K]} value The value to set.
    * @param {String} guild Guild or it's ID.
    * @returns {SettingsTypes} The server settings object.
    */
    push(key, value, guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (value == undefined)
            throw new LevelingError(errors.invalidTypes.value + typeof value);
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (!exports.LevelSettingsArray.includes(key))
            throw new LevelingError(errors.settingsManager.invalidKey + key);
        const botGuild = isGuild ? guild.id : guild.toString();
        const data = this.get(key, guild);
        const type = this.utils.typeOf(data);
        if (type !== 'Array')
            throw new LevelingError(errors.databaseManager.invalidTypes.target.array + type);
        this.database.push(`${botGuild}.settings.${key}`, value);
        return this.all(botGuild);
    }
    /**
    * Removes the element from a setting's array.
    *
    * Note: If the server don't have any setting specified,
    * the module will take the values from the
    * options object or default options object.
    *
    * @param {keyof SettingsArrays} key The setting to change.
    * @param {SettingsArrays[K]} value The value to remove.
    * @param {String} guild Guild or it's ID.
    * @returns {SettingsTypes} The server settings object.
    */
    unpush(key, value, guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (!exports.LevelSettingsArray.includes(key))
            throw new LevelingError(errors.settingsManager.invalidKey + key);
        const botGuild = isGuild ? guild.id : guild.toString();
        const data = this.get(key, guild);
        const index = data.indexOf(value);
        const type = this.utils.typeOf(data);
        if (type !== 'Array')
            throw new LevelingError(errors.databaseManager.invalidTypes.target.array + type);
        if (index == -1)
            throw new LevelingError(errors.settingsManager.valueNotFound(key, value));
        this.database.removeElement(`${botGuild}.settings.${key}`, index);
        return this.all(botGuild);
    }
    /**
     * Removes the specified setting.
     *
     * Note: If the server don't have any setting specified,
     * the module will take the values from the
     * options object or default options object.
     *
     * @param {keyof SettingsTypes} key The setting to remove.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    remove(key, guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof key !== 'string')
            throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        if (!exports.LevelSettingsArray.includes(key))
            throw new LevelingError(errors.settingsManager.invalidKey + key);
        const botGuild = isGuild ? guild.id : guild.toString();
        this.database.remove(`${botGuild}.settings.${key}`);
        return this.all(guild);
    }
    /**
     * Fetches the server's settings object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    all(guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const botGuild = isGuild ? guild.id : guild.toString();
        const settings = this.database.fetch(`${botGuild}.settings`);
        return {
            xp: settings?.xp == null ? null : settings?.xp,
            maxXP: settings?.maxXP == null ? null : settings?.maxXP,
            multiplier: settings?.multiplier == null ? null : settings?.multiplier,
            status: settings?.status == null ? null : settings?.status,
            ignoreBots: settings?.ignoreBots == null ? null : settings?.ignoreBots,
            ignoredUsers: settings?.ignoredUsers == null ? null : settings?.ignoredUsers,
            lockedChannels: settings?.lockedChannels == null ? null : settings?.lockedChannels,
            filter: settings?.filter || null
        };
    }
    /**
     * Resets all the settings to setting that are in options object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    reset(guild) {
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const botGuild = isGuild ? guild.id : guild.toString();
        const defaultSettings = {
            xp: this.options.xp,
            maxXP: this.options.maxXP,
            multiplier: this.options.multiplier,
            status: this.options.status,
            ignoreBots: this.options.ignoreBots,
            ignoredUsers: this.options.ignoredUsers,
            lockedChannels: this.options.lockedChannels,
            filter: this.options.filter
        };
        this.database.set(`${botGuild}.settings`, defaultSettings);
        return defaultSettings;
    }
}
exports.LevelSettingsManager = LevelSettingsManager;
/**
 * Total Level XP manager methods class.
 * @extends {Emitter}
 */
class TotalLevelXPManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * Total XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options) {
        super();
        this.database = new LevelDatabaseManager(options);
    }
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of total XP.
     */
    get(member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const totalXP = this.database.fetch(`${botGuild}.${user}.totalXP`);
        return totalXP;
    }
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(totalXP, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('setTotalXP', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp: userLevelData.xp,
            level: userLevelData.level,
            totalXP,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        });
        return this.database.set(`${botGuild}.${user}.totalXP`, totalXP);
    }
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(totalXP, member, guild, onMessage = false) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('addTotalXP', {
            guildID: botGuild,
            userID: user,
            xp: userData.xp,
            level: userData.level,
            gainedXP: totalXP,
            totalXP: userData.totalXP + totalXP,
            maxXP: userData.maxXP,
            difference: userData.difference,
            multiplier: userData.multiplier,
            onMessage
        });
        return this.database.add(`${botGuild}.${user}.totalXP`, totalXP);
    }
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(totalXP, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('subtractTotalXP', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp: userLevelData.xp,
            level: userLevelData.level,
            totalXP: userLevelData.totalXP - totalXP,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        });
        return this.database.subtract(`${botGuild}.${user}.totalXP`, totalXP);
    }
}
exports.TotalLevelXPManager = TotalLevelXPManager;
/**
 * LevelXP manager methods class.
 * @extends {Emitter}
 */
class LevelXPManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database;
    /**
     * XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options) {
        super();
        this.database = new LevelDatabaseManager(options);
    }
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    get(member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const xp = this.database.fetch(`${botGuild}.${user}.xp`);
        return xp;
    }
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(xp, member, guild, onMessage) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        if (!onMessage)
            this.emit('setXP', {
                userData: userLevelData.userData,
                guildID: botGuild,
                userID: user,
                xp,
                totalXP: userLevelData.totalXP,
                level: userLevelData.level,
                maxXP: userLevelData.maxXP,
                difference: userLevelData.difference,
                multiplier: userLevelData.multiplier
            });
        return this.database.set(`${botGuild}.${user}.xp`, xp);
    }
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(xp, member, guild, onMessage = false) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('addXP', {
            guildID: botGuild,
            userID: user,
            xp: userData.xp + xp,
            totalXP: userData.totalXP,
            level: userData.level,
            gainedXP: xp,
            maxXP: userData.maxXP,
            difference: userData.difference,
            multiplier: userData.multiplier,
            onMessage
        });
        return this.database.add(`${botGuild}.${user}.xp`, xp);
    }
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(xp, member, guild) {
        const isUser = member instanceof discord_js_1.GuildMember || member instanceof discord_js_1.User;
        const isGuild = guild instanceof discord_js_1.Guild;
        if (typeof member !== 'string' && !isUser)
            throw new LevelingError(errors.invalidTypes.member + typeof member);
        if (typeof guild !== 'string' && !isGuild)
            throw new LevelingError(errors.invalidTypes.guild + typeof guild);
        const user = isUser ? member.id : member.toString();
        const botGuild = isGuild ? guild.id : guild.toString();
        const userLevelData = this.database.fetch(`${botGuild}.${user}`);
        this.emit('subtractXP', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp: userLevelData.xp - xp,
            totalXP: userLevelData.totalXP,
            level: userLevelData.level,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        });
        return this.database.subtract(`${botGuild}.${user}.xp`, xp);
    }
}
exports.LevelXPManager = LevelXPManager;
/**
 * Level Colors.
 */
const levelcolors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};
/**
 * The `Level System`. Manage Levels & Ranks easily! (Based on [discord-leveling-super](https://npmjs.com/package/discord-leveling-super))
 * @example
 * const { Client } = require('discord.js')
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
    data.sendMessage(`Congrats, ${data.user}, you just reached the level **${data.level}**!`)
})
 */
class LevelSystem extends LevelEmitter {
    /**
     * The Leveling Options
     * @type {LevelOptions}
     */
    options;
    /**
     * The Discord Bot (Client)
     * @type {Client}
     */
    client;
    /**
     Module Ready Status
     @type {Boolean}
     */
    ready;
    /**
     * Module Errored Status
     * @type {Boolean}
     */
    errored;
    /**
     * Database Checking Interval
     * @type {NodeJS.Timeout}
     */
    interval;
    /**
     * The LevelError(s)
     * @type {LevelingError}
     */
    LevelError;
    /**
     * Utils manager Method
     * @type {LevelUtilsManager}
     */
    utils;
    /**
     * The Database
     * @type {LevelDatabaseManager}
     */
    database;
    /**
     * The (Level) Fetcher
     * @type {LevelFetchManager}
     */
    fetcher;
    /**
     * Settings Method
     * @type {LevelSettingsManager}
     */
    settings;
    /**
     * The XP of a User
     * @type {LevelXPManager}
     */
    xp;
    /**
     * The Level(s) of a User
     * @type {LevelManager}
     */
    levels;
    /**
     * The Total XP of a User
     * @type {TotalLevelXPManager}
     */
    totalXP;
    /**
     * The Rank(s) of a User
     * @type {LevelRanksManager}
     */
    ranks = LevelRanksManager;
    /**
     * Creates and run a new `LevelSystem`
     * @param client - The Bot (Client)
     * @param options - The Level Options
     */
    constructor(client, options = {}) {
        super();
        this.LevelError = LevelingError;
        this.utils = new LevelUtilsManager(options, client);
        this.options = this.utils.checkOptions(options.optionsChecker, options || {});
        this.client = client;
        this.ready = false;
        this.errored = false;
        this.interval = null;
        this.database = null;
        this.fetcher = null;
        this.settings = null;
        this.xp = null;
        this.levels = null;
        this.totalXP = null;
        this.ranks = null;
    }
    /**
    * Kills the Level System.
    * @fires LevelSytem#destroy
    * @returns {Leveling | boolean} Leveling instance.
    */
    kill() {
        if (!this.ready)
            return false;
        clearInterval(this.interval);
        this.ready = false;
        this.LevelError = null;
        this.interval = null;
        this.utils = null;
        this.database = null;
        this.fetcher = null;
        this.settings = null;
        this.xp = null;
        this.levels = null;
        this.totalXP = null;
        this.ranks = null;
        this.emit('destroy');
        return this;
    }
}
exports.LevelSystem = LevelSystem;
/**
 * The Easy Bot Emitter
 */
exports.easybotemitter = new events_1.EventEmitter();
/**
 * Simple Easy Bot (Class) Event Emitter
 * @private
 */
class EasyBotEmitter {
    constructor() { }
    /**
     * Listens to the event
     * @param {keyof ClientEvents} event Event Name
     * @param {(...args: ClientEvents[K][]) => void} listener The Event Listener
     */
    event(event, listener) {
        exports.easybotemitter.on(event, listener);
        return this;
    }
    /**
      * Listens to the event only for once.
     * @param {keyof ClientEvents} event Event name.
     * @param {(...args: ClientEvents[K][]) => void} listener Listener function.
     */
    once(event, listener) {
        exports.easybotemitter.once(event, listener);
        return this;
    }
    /**
     * Emits the Event
     * @param event - The Event
     * @param args - Event Name
     * @returns
     */
    emit(event, ...args) {
        return exports.easybotemitter.emit(event, ...args);
    }
}
exports.EasyBotEmitter = EasyBotEmitter;
/**
 * The EasyBot Class.
 * This is Class, that simplifies the [Client](https://old.discordjs.dev/#/docs/discord.js/main/class/Client) Class
 * @example
 * const { EasyBot, Intents } = require('discord-utilies');
 * const bot = new EasyBot({
 *    intents: Intents.Guilds, Intents.MessageContent
 * });
 *
 * bot.event('ready', () => {
 *   console.log('Ready!')
 *   bot.user.setPresence({ status: 'idle' });
 * }); // bot.onReady({ consoleLog: 'Ready', presence: { status: 'idle' } });
 *
 * bot.event('messageCreate', async message => {
 *    if (message.content === '!ping') {
 *         message.reply({ content: 'Pong!' });
 *    }
 * }); // bot.onMessage({ trigger: '!ping', reply: { message: 'Pong!' } });
 *
 * bot.start('DISCORD BOT TOKEN');
 */
class EasyBot extends EasyBotEmitter {
    /**
     * The Client Application(s)
     */
    applications;
    /**
     * The Client Actions
     */
    actions;
    /**
     * The Client Voice Property
     */
    voice;
    /**
     * A Property to Manage a User
     */
    user;
    /**
     * A Property to Manage Channels
     */
    channels;
    /**
     * A Property to Manage Users
     */
    users;
    /**
     * A Property to Manage Guilds (Servers)
     */
    guilds;
    /**
     * A Property to Manage the Bot Presence
     */
    presence;
    /**
     * The Client
     */
    client;
    /**
     * Creates a new `EasyBot`
     * @param options - The Bot Options
     */
    constructor(options) {
        super();
        if (!options.intents)
            throw new TypeError('INTENTS_INVALID: You must set Intents to the Bot!');
        this.client = new discord_js_1.Client({ intents: options.intents });
    }
    /**
     * Runs the `onMessage` Event
     * @example
     * .onMessage({ trigger: '!ping', reply: { message: 'Pong!' } });
     * @param options - The Message Options
     */
    onMessage(options) {
        if (!options.trigger)
            throw new TypeError('INVALID_TRIGGER: You must set an Trigger to the Message. (Like "!ping")');
        if (!options.reply)
            throw new TypeError('INVALID_MESSAGE_REPLY: You must set an valid Reply to the Message.');
        this.client.on('messageCreate', async (message) => {
            if (message.content === `${options.trigger}`) {
                await message.reply({ content: options.reply.message, embeds: options.reply.embeds, components: options.reply.components });
                console.log(`Responding to message with content: ${options.trigger} with: ${options.reply}`);
            }
        });
    }
    /**
     * Runs the `ready` Event
     * @example
     * .onReady({ consoleLog: `${bot.user.username} is ready`, presence: { status: 'idle' } });
     * @param options - The Ready Options
     */
    onReady(options) {
        this.client.on('ready', () => {
            console.log(options.consoleLog);
            this.client.user.setPresence(options.presence);
        });
    }
    run(token) {
        if (!token)
            throw new TypeError('INVALID_TOKEN: You must set an valid Token to the Bot');
        this.client.login(token);
    }
}
exports.EasyBot = EasyBot;
/**
 * The `CogManager` Class allows you to manage Cogs in a discord bot.
 * @example
 * const client = new Client();
 * const cogLoader = new CogLoader(client);
 *
 * cogLoader.on('addCog', (cog) => {
 *    console.log(`${cog.cogName} in ${cog.cogFolder} was loaded`);
 * });
 *
 * client.once('ready', () => {
 *    console.log('Ready');
 * });
 *
 * client.login('TOKEN');
 */
class CogManager {
    /**
     * The Cog EventEmitter
     */
    eventEmitter;
    /**
     * The Discord Bot (Client)
     */
    client;
    /**
     * The Cogs
     */
    cogs;
    /**
     * Creates a new Instance of the `CogLoader`
     * @param {Client} client - The Discord Bot Client
     */
    constructor(client) {
        this.eventEmitter = new events_1.EventEmitter();
        this.client = client;
        this.cogs = new Map();
    }
    /**
     *
     * @param {Object} cog - Cog Information, including name and folder
     * @param {string} code - The JavaScript Code of the Cog
     * @example
     * cogLoader.addCog({ cogName: 'MyCog', cogFolder: './cogs' }, '...');
     */
    addCog(cog, code) {
        this.cogs.set(cog.cogName, code);
        this.eventEmitter.emit('cogAdded', cog);
    }
    /**
     * Removes a Cog
     * @param {string} cogName - The Name of the Cog to remove
     * @example
     * cogLoader.removeCog('MyCog');
    */
    removeCog(cogName) {
        this.cogs.delete(cogName);
        this.eventEmitter.emit('cogRemoved', cogName);
    }
    /**
     * Execute (Runs) a Cog
     * @param {string} cogName - The Name of the Cog to execute
     * @param {any} trigger - The Trigger that triggers the Cog (like 'message', or 'interaction')
     * @example
     * cogLoader.executeCog('MyCog', message);
     */
    executeCog(cogName, trigger) {
        if (this.cogs.has(cogName)) {
            try {
                const code = this.cogs.get(cogName);
                eval(code);
                this.eventEmitter.emit('cogExecuted', cogName);
            }
            catch (error) {
                this.eventEmitter.emit('cogError', { cogName, error });
            }
        }
    }
    /**
    * Loads a Cog from a file.
    * @param {Object} cog - Cog information, including name and folder.
    * @param {string} filePath - The path to the Cog file.
    * @example
    * cogLoader.loadCogFromFile({ cogName: 'MyCog', cogFolder: 'Cogs' }, 'cog1.js');
     */
    loadCogFromFile(cog, filePath) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                this.eventEmitter.emit('cogLoadError', err);
            }
            else {
                this.addCog(cog, data);
                this.eventEmitter.emit('cogLoaded', cog);
            }
        });
    }
    /**
    * Loads all Cog files from a folder.
    * @param {string} cogFolder - The folder where Cog files are stored.
    * @example
    * cogLoader.loadCogsFromFolder('Cogs');
     */
    loadCogsFromFolder(cogFolder) {
        fs.readdir(cogFolder, (err, files) => {
            if (err) {
                this.eventEmitter.emit('cogLoadError', err);
            }
            else {
                files.forEach((file) => {
                    if (file.endsWith('.js' || '.ts')) {
                        const filePath = `${cogFolder}/${file}`;
                        const cog = { cogName: file, cogFolder };
                        this.loadCogFromFile(cog, filePath);
                    }
                });
            }
        });
    }
    /**
     * Adds a one-time event listener.
    * @param {string} event - The name of the event.
    * @param {Function} listener - The function to handle the event.
     */
    once(event, listener) {
        this.eventEmitter.once(event, listener);
    }
    /**
     * Adds an event listener.
    * @param {string} event - The name of the event.
    * @param {Function} listener - The function to handle the event.
     */
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
}
exports.CogManager = CogManager;
