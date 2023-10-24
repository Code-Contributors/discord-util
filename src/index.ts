import { Channel, BaseMessageOptions, Interaction, CommandInteraction, ColorResolvable, Message, TextChannel, ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Client, Collection, UserManager, User, AttachmentBuilder, GuildMember, Guild, MessagePayload, ClientEvents, GatewayIntentBits as Intents, PresenceData, ClientUser, ChannelManager, GuildManager, ClientPresence, ClientVoiceManager, ClientApplication } from 'discord.js';
import { EventEmitter } from 'events';
export { Message as Msg } from 'discord.js';
import { promisify } from 'util';
import * as fs from 'fs';
export { Intents };
import { writeFileSync, existsSync, readFileSync } from 'fs';
/**
 * The BBuilder (Button Builder)
 */
export class BBuilder extends ButtonBuilder {
    /**
     * 
     * @param options The Options
     */
    constructor(options) {
        super(options);
    }

    setStyle(style: ButtonStyle): this {
        this.data.style = style;
        return this;
    }

    removeLabel(): this {
        this.data.label = null;
        return this;
    }

    removeEmoji(): this {
        this.data.emoji = null;
        return this;
    }
}
/**
 * The `disableButtons` Function. With this you can Disable Buttons 
 * @param components - The Components
 * @returns 
 */
export function disableButtons(components: any[]) {
    for (let x = 0; x < components.length; x++) {
        for (let y = 0; y < components[x].components.length; y++) {
            components[x].components[y] = BBuilder.from(components[x].components[y]);
            components[x].components[y].setDisabled(true);
        }
    }
    return components;
}
/**
 * The `getNumEmoji` Function. Get a Number Emoji using this Function
 * @param number - The Number
 * @returns 
 */
export function getNumEmoji(number: number): string {
    const numEmoji = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return numEmoji[number];
}
/**
 * The `formatMessage` Function. This formats Messages into d.js Code
 * @param options - The Options
 * @param contentMsg - The Content Message
 * @returns 
 */
export function formatMessage(options: { message: any; opponent?: any; contentMsg: string }, contentMsg: string): string {
    const { message, opponent } = options;
    let content = options[contentMsg];

    content = content.replace('{player.tag}', message.author.tag).replace('{player-username}', message.author.username).replace('{player}', `<@!${message.author.id}>`);
    content = content.replace('{opponent.tag}', opponent?.tag).replace('{opponent.username}', opponent?.username).replace('{opponent}', `<@!${opponent?.id}>`);
    return content;
}
/**
 * The `decode` Function. Decode Content with 'html entities'
 * @param content - The Content to Decode
 * @returns 
 */
export function decode(content: string): string {
    return require('html-entities').decode(content);
}
/**
 * The `move` Function. 
 * @param pos - The Position
 * @param direction - The Direction
 * @returns 
 */
export function move(pos: { x: number; y: number }, direction: 'up' | 'down' | 'left' | 'right'): { x: number; y: number } {
    if (direction === 'up') return { x: pos.x, y: pos.y - 1 };
    else if (direction === 'down') return { x: pos.x, y: pos.y + 1 };
    else if (direction === 'left') return { x: pos.x - 1, y: pos.y };
    else if (direction === 'right') return { x: pos.x + 1, y: pos.y };
    else return pos;
}
/**
 * The `oppDirection` Function.
 * Manage oppDirections in your Code
 * @param direction - The Direction(s)
 * @returns 
 */
export function oppDirection(direction: 'up' | 'down' | 'left' | 'right'): 'up' | 'down' | 'left' | 'right' {
    if (direction === 'up') return 'down';
    else if (direction === 'down') return 'up';
    else if (direction === 'left') return 'right';
    else if (direction === 'right') return 'left';
    return direction;
}
/**
 * The `getAlphaEmoji` Function.
 * Get an AlphaEmoji based on the Letter.
 * @param letter - The Letter
 * @returns 
 */
export function getAlphaEmoji(letter: string): string | string[] {
    const letters: { [key: string]: string } = {
        A: '🇦', B: '🇧', C: '🇨', D: '🇩', E: '🇪', F: '🇫', G: '🇬', H: '🇭', I: '🇮',
        J: '🇯', K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🇴', P: '🇵', Q: '🇶', R: '🇷',
        S: '🇸', T: '🇹', U: '🇺', V: '🇻', W: '🇼', X: '🇽', Y: '🇾', Z: '🇿',
    };

    if (letter === '0') return Object.keys(letters).slice(0, 12);
    if (letter === '1') return Object.keys(letters).slice(12, 24);
    return letters[letter];
};
/**
 * The `shuffleArray` Function.
 * Shuffle your Arrays easily
 * @param array - The Array
 * @returns 
 */
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
/**
 * The ApproveOptions
 */
export interface ApproveOptions {
    options: {};
    embed?: {
        title?: string;
        color?: string;
        requestTitle?: string;
        requestColor?: ColorResolvable;
        rejectTitle?: string;
        rejectColor: ColorResolvable;
    };
    buttons?: {
        accept?: string;
        reject?: string;
    };
    reqTimeoutTime?: number;
    mentionUser?: boolean;
    requestMessage?: string;
    rejectMessage?: string;
    reqTimeoutMessage?: string;
    isSlashGame?: boolean;
    message: any;
    opponent?: any;
    contentMsg: string | undefined;
}
/**
 * The `Approve` Class.
 * This manage the Most of the Games 
 */
export class Approve extends EventEmitter {
    public player1Turn: boolean;
    public options: ApproveOptions;
    public message: any;
    public opponent: any;
    /**
     * Create a new `Approve` instance
     * @param options - The Options
     */
    constructor(options: ApproveOptions) {
        super();

        if (!options.embed) options.embed
        if (!options.embed.requestTitle) options.embed.requestTitle = options.embed.title;
        if (!options.embed.requestColor) options.embed.requestColor = options.embed.color as ColorResolvable; 
        if (!options.embed.rejectTitle) options.embed.rejectTitle = options.embed.title;
        if (!options.embed.rejectColor) options.embed.rejectColor = options.embed.color as ColorResolvable; 


        if (!options.buttons) options.buttons = {};
        if (!options.buttons.accept) options.buttons.accept = 'Accept';
        if (!options.buttons.reject) options.buttons.reject = 'Reject';

        if (!options.reqTimeoutTime) options.reqTimeoutTime = 30000;
        if (typeof options.mentionUser === 'undefined') options.mentionUser = false;
        if (!options.requestMessage) options.requestMessage = '{player} has invited you for a round of Game.';
        if (!options.rejectMessage) options.rejectMessage = 'The player denied your request for a round of Game.';
        if (!options.reqTimeoutMessage) options.reqTimeoutMessage = 'Dropped the game as the player did not respond.';

        this.options = options;
        this.message = options.message;
        this.opponent = options.opponent;

    }
    /**
     * 
     * @param content - The Message Content
     * @returns 
     */
    private async sendMessage(content: any) {
        if (this.options.isSlashGame) return await this.message.editReply(content).catch(e => {});
        else return await this.message.channel.send(content).catch(e => {});
    }

    public async approve() {
        return new Promise(async resolve => {
            const embed = new EmbedBuilder()
            .setColor(this.options.embed.requestColor)
            .setTitle(this.options.embed.requestTitle)
            .setDescription(formatMessage(this.options, 'requestMessage'));
          
    
          const btn1 = new ButtonBuilder().setLabel(this.options.buttons.accept).setCustomId('approve_accept').setStyle(ButtonStyle.Success);
          const btn2 = new ButtonBuilder().setLabel(this.options.buttons.reject).setCustomId('approve_reject').setStyle(ButtonStyle.Danger);
          const row = new ActionRowBuilder().addComponents(btn1, btn2);
    
          const content = this.options.mentionUser ? `<@!${this.opponent.id}>` : null;
          const msg = await this.sendMessage({ content, embeds: [embed], components: [row], allowedMentions: { parse: ['users'] } });
          const collector = msg.createMessageComponentCollector({ time: this.options.reqTimeoutTime });
    
          collector.on('collect', async btn => {
            await btn.deferUpdate().catch(e => {});
            if (btn.user.id === this.opponent.id) collector.stop(btn.customId.split('_')[1]);
          });
    
          collector.on('end', async (_, reason) => {
            if (reason === 'accept') return resolve(msg);
    
            const newEmbed = new EmbedBuilder()
              .setColor(this.options.embed.rejectColor as ColorResolvable)
              .setTitle(this.options.embed.rejectTitle)
              .setDescription(formatMessage(this.options, 'rejectMessage'));
    
            if (reason === 'time') newEmbed.setDescription(formatMessage(this.options, 'reqTimeoutMessage'));
            this.emit('gameOver', { result: reason, player: this.message.author, opponent: this.opponent });
            await msg.edit({ content: null, embeds: [newEmbed], components: [] });
            return resolve(false);
          });
        });
      }
    
      public formatTurnMessage(options: ApproveOptions, contentMsg: string) {
        const { message, opponent } = options;
        let player1 = (!this.player1Turn) ? opponent : message.author;
        let content = options[contentMsg];
    
        content = content.replace('{player.tag}', player1.tag).replace('{player.username}', player1.username).replace('{player}', `<@!${player1.id}>`);
        content = content.replace('{opponent.tag}', opponent.tag).replace('{opponent.username}', opponent.username).replace('{opponent}', `<@!${opponent.id}>`);
        return content;
      }
}
/**
 * The ButtonStyle Options
 */
export interface ButtonStyleOptions extends ApproveOptions {
    Primary: ButtonStyle.Primary,
    Secondary: ButtonStyle.Secondary,
    Success: ButtonStyle.Success,
    Danger: ButtonStyle.Danger,
    Link: ButtonStyle.Link,
}
/**
 * The MemoryGame Options
 */
export interface MemoryOptions {
    isSlashGame?: boolean;
    message: any;
    embed?: {
        title?: string;
        color?: ColorResolvable;
        description?: string;
        findDescription?: string;
    };
    timeoutTime?: number;
    hideEmojiTime?: number;
    buttonStyle?: ButtonStyle;
    emojis?: string[];
    winMessage?: string;
    loseMessage?: string;
    timeoutMessage?: string;
    playerOnlyMessage?: string | boolean;
    contentMsg: string;
}
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
export class MemoryGame extends EventEmitter {
    private options: MemoryOptions;
    private message: any;
    private emojis: string[];
    private selected: string | null;
    private emoji: string | null;
    /**
     * Create a new `MemoryGame`
     * @param options - The Options
     */
    constructor(options: MemoryOptions) {
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
            buttonStyle: ButtonStyle.Primary,
            emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🍒'],
            winMessage: 'You won! You selected the correct emoji. {emoji}',
            loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
            timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
            playerOnlyMessage: false,
            ...options,
        };

        if (!this.options.message) throw new TypeError('NO_MESSAGE: No message option was provided.');
        if (typeof this.options.message !== 'object') throw new TypeError('INVALID_MESSAGE: message option must be an object.');
        if (typeof this.options.isSlashGame !== 'boolean') throw new TypeError('INVALID_COMMAND_TYPE: isSlashGame option must be a boolean.');
    }
    /**
     * 
     * @param content - The Message Content
     * @returns 
     */
    async sendMessage(content: any) {
        if (this.options.isSlashGame) return await this.message.editReply(content).catch(e => {});
        else return await this.message.channel.send(content).catch(e => {});
    }
    /**
     * Starts the Game
     */
    async startGame() {
        if (this.options.isSlashGame || !this.message.author) {
            if (!this.message.deferred) await this.message.deferReply().catch(e => {});
            this.message.author = this.message.user;
            this.options.isSlashGame = true;
        }

        this.emojis = shuffleArray(this.emojis).slice(0, 8);
        this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];

        const embed = new EmbedBuilder()
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
                await btn.deferUpdate().catch(e => {});
                if (btn.user.id !== this.message.author.id) {
                    if (this.options.playerOnlyMessage) btn.followUp({ content: formatMessage(this.options, 'playerOnlyMessage'), ephemeral: true });
                    return;
                }
                this.selected = this.emojis[parseInt(btn.customId.split('_')[1])];
                return collector.stop();
            });

            collector.on('end', async (_, reason) => {
                if (reason === 'idle' || reason === 'user') return this.gameOver(msg, (reason === 'user'));
            });
        }, this.options.hideEmojiTime);
    }
    /**
     * The GameOver Event
     * @param msg - The GameOver Message
     * @param result - The End-Result
     * @returns 
     */
    gameOver(msg: any, result: boolean) {
        const FindEmojiGame = { player: this.message.author, selectedEmoji: this.selected, correctEmoji: this.emoji };
        const resultMessage = result ? ((this.selected === this.emoji) ? 'win' : 'lose') : 'timeout';
        this.emit('gameOver', { result: resultMessage, ...FindEmojiGame });
        if (!result) this.selected = this.emoji;

        const embed = new EmbedBuilder()
            .setColor(this.options.embed.color as ColorResolvable)
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
    getComponents(showEmoji: boolean) {
        const components: ActionRowBuilder[] = [];
        for (let x = 0; x < 2; x++) {
            const row = new ActionRowBuilder();
            for (let y = 0; y < 4; y++) {
                const buttonEmoji = this.emojis[x * 4 + y];

                const btn = new ButtonBuilder().setCustomId('findEmoji_' + (x * 4 + y))
                    .setStyle(buttonEmoji === this.selected ? (this.selected === this.emoji ? ButtonStyle.Success : ButtonStyle.Danger) : this.options.buttonStyle);
                if (showEmoji) btn.setEmoji(buttonEmoji);
                else btn.setLabel('\u200b');
                row.addComponents(btn);
            }
            components.push(row);
        }
        return components;
    }
}
/**
 * Defines a List of available Slash Command Option Types
 * @ https://discord.com/developers/docs/interactions/application-commands 
 */
export enum SlashCommandOptionTypes {
  SUB_COMMAND = "SUB_COMMAND",
  SUB_COMMAND_GROUP = "SUB_COMMAND_GROUP",
  STRING = "STRING",
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  USER = 'USER',
  CHANNEL = 'CHANNEL',
  ROLE = 'ROLE',
}

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
export class SlashCommandLoader {
  private client: Client;
  private commands: Collection<string, { data: any, execute: any }>;
  /**
   * Create a new `SlashCommandLoader`
   * @param client - The Client (Bot)
   */
  constructor(client: Client) {
      this.client = client;
      this.commands = new Collection();
  }

  /**
   * Load all Slash commands from the specified directory.
   * @param commandsFolder The directory where the Slash command files are located.
   */
  loadCommands(commandsFolder: string) {
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
                      } else {
                          console.log(`Error loading Slash command: ${file}`);
                      }
                  } else {
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
  async handleInteraction(interaction: Interaction) {
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);

      if (command) {
          try {
              await command.execute(interaction);
          } catch (error) {
              console.error('Error executing Slash command:', error);
              await interaction.reply('An error occurred.');
          }
      }
  }
}
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
export class DiscordDataBase {
    private databasePath: string;
    private data: Record<string, any>;
    /**
     * Create a new `DiscordDataBase` instance
     * @param path - The Path to the Database
     */
    constructor(path: string) {
        this.databasePath = path;
        this.data = this.loadDatabase();
    }
    /**
     * The `loadDatabase` Function. This loads your Data
     * @returns 
     */
    private loadDatabase(): Record<string, any> {
        try {
            const rawData = fs.readFileSync(this.databasePath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            return {};
        }
    }
    /**
     * The `saveDatabase` Function. This save your Data
     */
    private saveDatabase() {
        fs.writeFileSync(this.databasePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }
    /**
     * The `set` Function. This sets Data to your Database
     * @param key - The Key
     * @param value - The Value
     */
    public set(key: string, value: any) {
        this.data[key] = value;
        this.saveDatabase();
    }
    /**
     * The `get` Function. With this you can get/load Data from your DataBase
     * @param key - The Key
     * @returns 
     */
    public get(key: string): any {
        return this.data[key];
    }
    /**
     * The `delete` Funtion. This deletes Data in your Database
     * @param key - The Key
     */
    public delete(key: string) {
        delete this.data[key];
        this.saveDatabase();
    }
}
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
export class DataBaseManager {
    private databasePath: string;
    /**
     * Create a new `DataBaseManager` instance.
     * @param databasePath - The Path to the Database File.
     */
    constructor(databasePath: string) {
        this.databasePath = databasePath;
    }
    /**
     * Create a new Database file
     */
    createDatabase() {
        if (!fs.existsSync(this.databasePath)) {
            fs.writeFileSync(this.databasePath, JSON.stringify({}, null, 2), 'utf-8');
            console.log('Database created');
        } else {
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
        } else {
            console.log('Database already exists');
        }
    }
    /**
     * Get data from the database by key.
     * @param key - The key to retrieve data.
     * @returns The data associated with the given key
     */
    getData(key: string) {
        const databaseContent = this.loadDatabase();
        return databaseContent[key];
    }
    /**
     Save data into the database.
     * @param key - The key to associate with the data.
     * @param value - The data to save.
     */
    setData(key: string, value: any) {
        const databaseContent = this.loadDatabase();
        databaseContent[key] = value;
        this.saveDatabase(databaseContent);
    }
    /**
     * Delete data from the database by key.
     * @param key - The key to delete data.
     */
    deleteData(key: string) {
        const databaseContent = this.loadDatabase();
        delete databaseContent[key];
        this.saveDatabase(databaseContent);
    }
    /**
     * Private Helper Method 1
     * @returns 
     */
    private loadDatabase() {
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
    private saveDatabase(data: any) {
        fs.writeFileSync(this.databasePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}
/**
 * The Reply Options.
 * This are the Options for the `reply` Function.
 */
export interface ReplyOptions {
    interaction: CommandInteraction | undefined;
    msg: Message | undefined;
    message: string | undefined;
}
/**
 * The `reply` Function. With this you can easily reply Messages
 * @param options - The Reply Options
 */
export async function reply(options: ReplyOptions) {
    if (!options.interaction) throw new TypeError("You must input a valid interaction!");
    if (!options.message) throw new TypeError("You must input a valid message!");

    await options.interaction.reply(options.message);
    await options.msg.reply(options.message);
    console.log(options.message, options.interaction.user.id);
}
/**
 * The `ErrorHandler` Class.
 * This class provides methods for handling and reporting errors.
 */
export class ErrorHandler {
    /**
     * Log an Error Message to the console
     * @param error - The Error Message or Object to log
     */
    static logError(error: any) {
        console.error("Error:", error);
    }
    /**
     * Send an error message to a specific channel.
     * @param channel - The TextChannel to send the error message to.
     * @param error - The error message or object to send.
     */
    static sendErrorToChannel(channel: TextChannel, error: any) {
        channel.send(`The ErrorHandler have to report the Error: ${error}`);
    }
    /**
     * Handle an error and provide a user-friendly response to an interaction.
     * @param interaction - The CommandInteraction to respond to.
     * @param error - The error message or object to handle.
     */
    static handleInteractionError(interaction: CommandInteraction, error: any) {
        const errorMessage = "An error occurred while processing your request.";
        interaction.reply(errorMessage);
        console.error("Error in interaction:", error);
    }
    /**
     * Handle an error and provide a user-friendly response to a regular message.
     * @param channel - The TextChannel to send the response to.
     * @param error - The error message or object to handle.
     */
    static handleTextChannelError(channel: TextChannel, error: any) {
        const errorMessage = "An error occurres while processing your request.";
        channel.send(errorMessage);
        console.error("Error in text channel:", error);
    }
}
/**
 * The `CustomLogger` Class allows you to create and display custom log messages
 * @example
 * // Example of using the CustomLogger
const logger = new CustomLogger('MyApp');

logger.info('This is an information message.');
logger.warn('This is a warning.');
logger.error('This is an error message.');
 */
export class CustomLogger {
    /**
     * Creates a new instance of the `CustomLogger`.
     * @param prefix - An optional prefix to prepend to all log messages.
     */
    constructor(private prefix: string = '') {}
    /**
     * Logs an information message.
     * @param message - The message to be logged.
     */
    public info(message: string) {
        this.log(`[INFO] ${message}`);
    }
    /**
     * Logs an error message.
     * @param message - The error message to be logged.
     */
    public error(message: string) {
        this.log(`[ERROR] ${message}`);
    }
    /**
     * Logs a warning.
     * @param message - The warning to be logged.
     */
    public warn(message: string) {
        this.log(`[WARNING] ${message}`);
    }
    /**
    * Internal logging of the message.
    * @param message - The message to log.
     */
    private log(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} ${this.prefix}${message}`);
    }
}
/**
 * The Level UP Data
 */
export interface LevelUpData {
    /**
     * The Guild ID.
     */
    guildID: string;
    /**
     * The User that reached a new Level
     */
    user: User;
    /**
     * New Level
     */
    level: number;
    /**
     * How much XP in total the User need to reach the next Level
     */
    maxXP: number;
    /**
     * User's XP multiplier
     */
    multiplier: number;
    /**
     * A function that will send a specified message to a specified channel.
     * @param {String} msg Message string, embed, attachment or message options.
     * @param {String} channel Channel or it's ID.
     */
    sendMessage(msg: string | EmbedBuilder | AttachmentBuilder | BaseMessageOptions, channel?: string | Channel ): Promise<Message>;
}
/**
 * The XP Data
 */
export interface LevelXPData {
    /**
     * The Guild Id
     */
    guildID: string;
    /**
     * The User Id
     */
    userID: string;
    /**
     * User's amount of XP
     */
    xp: number;
    /**
     * Users total Amount of XP
     */
    totalXP: number;
    /**
     * The Level of the User
     */
    level: number;
    /**
     * How much XP in total the User need to reach the new Level
     */
    maxXP: number;
    /**
     * The difference between max and current amount of XP
     */
    difference: number;
    /**
     * User's XP Multiplier
     */
    multiplier: number;
    /**
     * The value will be true if the event was called on 'messageCreate' bot event.
     */
    onMessage: boolean;
}

export interface LevelUserData {
    /**
     * The User ID
     */
    id: string;

    /**
     * The Username of the User
     */
    username: string;
    /**
     * The Tag of the User [OUTDATED]
     */
    tag: string;
    /**
     * User's discriminator
     */
    discriminator: string;
}
/**
 * The Cog Events
 */
export interface CogEvents {
    cogAdded: (cog: { cogName: string; cogFolder: string }) => void;
    cogRemoved: (cogName: string) => void;
    cogExecuted: (cogName: string) => void;
    cogError: (cog: { cogName: string; error: Error }) => void;
    cogLoadError: (error: Error) => void;
    cogLoaded: (cog: { cogName: string; cogFolder: string }) => void;
}
export interface LevelData {
     /**
     * Guild ID.
     */
     guildID: string

     /**
      * User ID.
      */
     userID: string
 
     /**
      * The user data that is stored in database.
      * Use it in case if the requested user
      * is not on your server.
      */
     userData: LevelUserData
 
     /**
      * User's amount of XP.
      */
     xp: number
 
     /**
      * User's total amount of XP.
      */
     totalXP: number
 
     /**
      * User's level.
      */
     level: number
 
     /**
     * How much XP in total the user need to reach the next level.
     */
     maxXP: number
 
     /**
     * The difference between max XP and current amount of XP. It shows how much XP he need to reach the next level.
     */
     difference: number
     
     /**
      * User's XP multiplier.
      */
     multiplier: number
}

export interface LevelEvents {
    /**
     * Level UP
     */
    levelUp: LevelUpData

    setLevel: LevelData
    addLevel: LevelXPData
    subtractLevel: LevelData

    setXP: LevelData
    addXP: LevelXPData & {

        /**
         * How much XP the user gained after sending a message
         */
        gainedXP: number
    }

    subtractXP: LevelData

    setTotalXP: LevelData
    addTotalXP: LevelXPData & {

        /**
         * How much XP the user gained after sending a message
         */
        gainedXP: number
    },

    subtractTotalXP: LevelData,

    ready: void,
    destroy: void
}
/**
 * The Level Emitter
 */
export const levelemitter = new EventEmitter();
/**
 * Simple Level event emitter with only important emitter methods.
 * @private
 */
export class LevelEmitter {
    constructor() {}
    /**
     * Listens to the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    on<K extends keyof LevelEvents>(event: K, listener: (...args: LevelEvents[K][]) => void): this {
        levelemitter.on(event, listener);
        return this;
    }
    /**
     * Listens to the event only for once.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    once<K extends keyof LevelEvents>(event: K, listener: (...args: LevelEvents[K][]) => void): this {
        levelemitter.once(event, listener);
        return this;
    }
    /**
     * Emits the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {LevelEvents[K][]} args Listener arguments.
     */
    emit<K extends keyof LevelEvents>(event: K, ...args: LevelEvents[K][]): boolean {
        return levelemitter.emit(event, ...args)
    }
}
/**
 * The Updater Options
 */
export interface LevelUpdaterOptions {
    /**
     * Sends the update state message in console on start. Default: true.
     */
    checkUpdates?: boolean

    /**
     * Sends the message in console on start if module is up to date. Default: true.
     */
    upToDateMessage?: boolean
}
/**
 * Options object for an 'Leveling.utils.checkOptions' method.
 */
export interface LevelCheckerOptions {
    /**
     * Allows the method to ignore the options with invalid types. Default: false.
     */
    ignoreInvalidTypes?: boolean;
    /**
     * Allows the method to ignore the unspecified options. Default: false.
     */
    ignoreUnspecifiedOptions?: boolean;
    /**
     * Allows the method to ignore the unexisting options. Default: false.
     */
    ignoreInvalidOptions?: boolean;
    /**
     * Allows the method to show all the problems in the console. Default: false
     */
    showProblems?: boolean;
    /**
     * Allows the method to send the result in the console. Default: false.
     */
    sendLog?: boolean;
    /**
     * Allows the method to send the result if no problems were found. Default: false
     */
    sendSuccessLog?: boolean;
}
/**
 * Level Error Handler Options Object
 */
export interface LevelErrorHandlerOptions {
    /**
     * Handle all Level Errors on startup. Default: true
     */
    handleErrors?: boolean;
    /**
     * Amount of attempts to load the module. Use 0 for infinity attempts. Default: 5
     */
    attempts?: number;
    /**
     * Time between every attempt to start the module (in ms). Default: 3000
     */
    time?: number;
}
/**
 * The Level Leaderboard Data
 */
export interface LevelLeaderboardData {
    userID: String,
    level: Number,
    totalXP: Number,
    xp: Number,
    maxXP: Number,
    difference: Number,
    user: User,
    /**
     * The user data that is stored in the database
     * Use it in case if the requested User is not on your Server
     */
    userData: LevelUserData
}
/**
 * Constructor Level options object
 */
export interface LevelOptions {
    /**
     * Path to the JSON File. Default: './leveling.json'
     */
    storagePath?: string;
    /**
     * Checks if the database file exist and if it have errors. Default: true
     */
    checkStorage?: boolean;
    /**
     * Checks for if storage file exist in specific time (in ms). Default: 1000
     */
    updateCountdown?: number;
    /**
     * Amount of XP that the user will receive after sending a message.
     * Array of [min, max] is possible for a random XP per message. Default: 5
     */
    xp?: number | [number, number];
    /**
     * Amount of XP that the user need to reach the next level.
     * This value will double for each level. Default: 300
     */
    maxXP?: number;
    /**
     * You can enable or disable the level system using this option
     */
    status?: boolean;
    /**
     * XP multiplier. Default: 1
     */
    multiplier?: number;
    /**
     * Array of channel IDs that wont give XP to an user
     */
    lockedChannels?: string[];
    /**
     * Array of User IDs that wont get XP
     */
    ignoredUsers?: string[];
    /**
     * Array on Guilds on which none of the members will reach XP
     */
    ignoredGuilds?: string[];
    /**
     * If true, it will ignore every Message from Bots. Default: true
     */
    ignoreBots?: boolean;
    /**
     * Filter function that accepts a message; 
     * it must return a boolean value and it will add XP 
     * only to authors of filtered messages.; 
     * Use 'null' to disable the filter. 
     * Default: '() => true'.
     * @param msg The Message
     */
    filter?(msg: Message): boolean;
    /**
     * Level Updater Checker options object
     */
    updater?: LevelUpdaterOptions;
    /**
     * * Options object for an 'Leveling.utils.checkOptions' method.
     */
    optionsChecker?: LevelCheckerOptions;

    errorHandler?: LevelErrorHandlerOptions
}
/**
 * The Rank Data
 */
export interface LevelRankData {
    /**
     * The User Data that is stored in the database.
     * Use it in Case if the requested User is not in your Server
     */
    userData: LevelUserData;
    /**
     * User's amount of XP
     */
    xp: number;
    /**
     * Users total amount of XP
     */
    totalXP: number;
    /**
     * The Level of the User
     */
    level: number;
    /**
     * How much XP in total the user need to reach the next level
     */
    maxXP: number;
    /**
     * The difference between max and current amount of XP. It shows how much XP the user need to reach the nex level
     */
    difference: number;
    /**
     * User's XP multiplier
     */
    multiplier: number
}
/**
 * The Level Rank Object
 */
export interface LevelRankObject {
    /**
     * Users amount of XP
     */
    xp: number;
    /**
     * Users total amount of XP
     */
    totalXP: number;
    /**
     * Users level
     */
    level: number;
    /**
     * How much XP the user need to reach the next level
     */
    maxXP: number;
    /**
     * The difference between the max and the current amount of xp
     */
    difference: number;
    /**
     * Users XP multiplier
     */
    multiplier: number;
}
/**
 * The Level Filter Function type
 */
export type LevelFilterFunction = (msg?: Message) => boolean;
/**
 * The Level Settings Types
 */
export interface LevelSettingsTypes {
    xp: number | [number, number];
    maxXP: number;
    multiplier: number;
    status: boolean;
    ignoredUsers: string[];
    lockedChannels: string[];
    ignoreBots: boolean;
    filter: string | Function | LevelFilterFunction
}
/**
 * The Level Setting Arrays
 */
export interface LevelSettingsArrays {
    ignoredUsers: string[],
    lockedChannels: string[]
}
/**
 * Level Version data object
 */
export interface LevelUpdateData {
    /**
     * Checks for if module is up to date
     */
    updated: boolean,
    /**
     * Shows an installed version of the module
     */
    installedVersion: string,
    /**
     * Shows the latest Version of the module
     */
    packageVersion: string
}
/**
 * The `LevelingError` Class
 */
export class LevelingError extends Error {
    /**
     * Creates an `LevelingError` instance.
     * @param {String | Error} message Error message.
     */
    constructor(message?: any) {
        if (message instanceof Error) {
            super(message.message);
            Error.captureStackTrace(this, this.constructor)
        }
        else super(message);
        /***
         * The Name of the Error (Error Name)
         * @type {String}
         */
        this.name = 'LevelingError'
    }
}
/**
 * This is the Structure of the JSON Database File
 */
export const LevelDefaultObject = {
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
}
/**
 * The Default Level Options
 */
export const LevelDefaultOptions: LevelOptions = {
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
}
/**
 * The Level Setting Array(s)
 */
export const LevelSettingsArray = [
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
export const LevelingErros = {
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
        invalidKey: `INVALID_KEY[15]: You have specified the incorrect settings key. It must be one of the following values:\n${LevelSettingsArray.map(x => `'${x}'`).join(', ')}.\nReceived: `,
        valueNotFound(setting: string, value: string) {
            return `Cannot find the value "${value}", in a setting "${setting}".`
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
        
        invalidChannels(channelsArray: string[]) {
            if (channelsArray.length == 1) return `Cannot find the specified channel: ${channelsArray[0]}`
            return `Cannot find the ${channelsArray.length} specified channels: ${channelsArray.join(', ')}`
        }
    },

    ignoredUsers: {
        invalidTypes: 'INVALID_TYPE_IGNORED_USERS[26]: The elements of array of ignored users must be a string. Received: ',
        
        invalidUsers(usersArray: string[]) {
            if (usersArray.length == 1) return `Cannot find the specified user: ${usersArray[0]}`
            return `Cannot find the ${usersArray.length} specified users: ${usersArray.join(', ')}`
        }
    },

    ignoredGuilds: {
        invalidTypes: 'INVALID_TYPE_IGNORED_GUILDS[27]: The elements of array of ignored guilds must be a string. Received: ',

        invalidGuilds(guildsArray: string[]) {
            if (guildsArray.length == 1) return `Cannot find the specified guild: ${guildsArray[0]}`
            return `Cannot find the ${guildsArray.length} specified guilds: ${guildsArray.join(', ')}`
        }
    },

    reservedName(name: string) {
        return `'${name}' is a reserved storage file name. You cannot use it.`
    }
}
const errors = LevelingErros;
/**
 * The `LevelFetchManager`. This fetchs Levels etc.
 */
export class LevelFetchManager {
    /**
     * Storage Path.
     * @type {String}
     * @private
     */
    private storagePath: string

    /**
     * Fetch manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions) {
        this.storagePath = options.storagePath || './leveling.json'
    }

    /**
     * Gets the amount of XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    public fetchXP(member: string | GuildMember | User, guild: string | Guild): number {
        const data = this.fetchAll()

        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const guildData = data[botGuild]
        const memberData: LevelRankObject = guildData?.[user]

        const xp = memberData?.xp

        return (xp || 0)
    }

    /**
    * Gets the amount of total XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    public fetchTotalXP(member: string | GuildMember | User, guild: string | Guild): number {
        const data = this.fetchAll()

        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const guildData = data[botGuild]
        const memberData: LevelRankObject = guildData?.[user]

        const totalXP = memberData?.totalXP

        return (totalXP || 0)
    }

    /**
    * Gets the amount of levels for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    public fetchLevels(member: string | GuildMember | User, guild: string | Guild): number {
        const data = this.fetchAll()

        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const guildData = data[botGuild]
        const memberData: LevelRankObject = guildData?.[user]

        const levels = memberData?.level

        return (levels || 0)
    }

    /**
    * Gets the amount of max XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    public fetchMaxXP(member: string | GuildMember | User, guild: string | Guild): number {
        const data = this.fetchAll()

        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const guildData = data[botGuild]
        const memberData: LevelRankObject = guildData?.[user]

        const maxXP = memberData?.maxXP

        return (maxXP || 0)
    }

    /**
    * Gets the difference between max XP and user's XP.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    public fetchDifference(member: string | GuildMember | User, guild: string | Guild): number {
        const data = this.fetchAll()

        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const guildData = data[botGuild]
        const memberData: LevelRankObject = guildData?.[user]

        const difference = memberData?.difference

        return (difference || 0)
    }

    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    public fetchAll(): object {
        const isFileExisting = existsSync(this.storagePath)

        if (!isFileExisting) writeFileSync(this.storagePath, '{}')

        const fileData = readFileSync(this.storagePath)
        const stringData = fileData.toString()

        return JSON.parse(stringData)
    }


}
/**
 * Level Dot Parser
 * @private
 */
export class LevelDotParser {
    public options: LevelOptions;
    public storagePath: string;

    public fetcher: LevelFetchManager;
    /** 
     * Leveling constructor options object. There's only needed options object properties for this manager to work properly.
     * @param {Object} options Constructor options object.
     * @param {String} options.storagePath Full path to a JSON file. Default: './leveling.json'.
     */
    constructor(options: LevelOptions) {

        /**
         * Leveling constructor options object.
         * @private
         * @type {LevelingOptions}
         */
        this.options = options

        /**
         * Fetch manager methods object.
         * @type {FetchManager}
         * @private
         */
        this.fetcher = new LevelFetchManager(options)

        if (!options.storagePath) this.storagePath = LevelDefaultOptions.storagePath
    }

    /**
     * Parses the key and fetches the value from database.
     * @param {String} key The key in database.
     * @returns {any | false} The data from database or 'false' if failed to parse or 'null' if nothing found.
     */
    parse(key: string): any | false {
        let parsed = this.fetcher.fetchAll()

        if (!key) return false
        if (typeof key !== 'string') return false

        const keys = key.split('.')
        let tmp = parsed

        for (let i = 0; i < keys.length; i++) {
            if ((keys.length - 1) == i) {
                parsed = tmp?.[keys[i]] || null
            }

            tmp = tmp?.[keys[i]]
        }

        return parsed || null
    }

    /**
     * Parses the key and sets the data in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set.
     * @returns {Boolean} If set successfully: true; else: false
     */
    set(key: string, value: any): boolean {
        const { isObject } = this
        let storageData = this.fetcher.fetchAll()

        if (!key) return false
        if (typeof key !== 'string') return false

        if (value == undefined) return false
        if (typeof value == 'function') return false


        const keys = key.split('.')
        let tmp = storageData

        for (let i = 0; i < keys.length; i++) {

            if ((keys.length - 1) == i) {
                tmp[keys[i]] = value

            } else if (!isObject(tmp[keys[i]])) {
                tmp[keys[i]] = {}
            }

            tmp = tmp?.[keys[i]]
        }

        writeFileSync(this.options.storagePath || './leveling.json', JSON.stringify(storageData, null, '\t'))

        return true
    }

    /**
     * Parses the key and removes the data from database. 
     * @param {String} key The key in database.
     * @returns {Boolean} If removed successfully: true; else: false
     */
    remove(key: string): boolean {
        const { isObject } = this
        let storageData = this.fetcher.fetchAll()

        if (!key) return false
        if (typeof key !== 'string') return false

        const data = this.parse(key)
        if (data == null) return false

        const keys = key.split('.')
        let tmp = storageData

        for (let i = 0; i < keys.length; i++) {
            if ((keys.length - 1) == i) {
                delete tmp?.[keys[i]]

            } else if (!isObject(tmp?.[keys[i]])) {
                tmp[keys[i]] = {}
            }

            tmp = tmp[keys[i]]
        }

        writeFileSync(this.options.storagePath || './leveling.json', JSON.stringify(storageData, null, '\t'))

        return true
    }

    /**
     * Checks for is the item object and returns it.
     * @param {any} item The item to check.
     * @returns {Boolean} Is the item object or not.
    */
    isObject(item: any): boolean {
        return !Array.isArray(item)
            && typeof item == 'object'
            && item !== null
    }
}

/**
 * Level Database manager methods class.
 */
export class LevelDatabaseManager {

    /**
     * Dor Parser.
     * @type {DotParser}
     * @private
     */
    private parser: LevelDotParser

    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    private fetcher: LevelFetchManager

    /**
     * Database manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions) {
        this.fetcher = new LevelFetchManager(options)
        this.parser = new LevelDotParser({ storagePath: options.storagePath || './leveling.json', errorHandler: { attempts: 5, handleErrors: true, time: 3000 } })
    }

    /**
     * Gets a list of keys in database.
     * @param {String} key The key in database.
     * @returns {string[]} An array with all keys in database or 'null' if nothing found.
     */
    public keyList(key: string): string[] {
        const storageData = this.fetcher.fetchAll()
        const data = this.fetch(key)

        if (!key || typeof key !== 'string') return Object.keys(storageData).filter(x => storageData[x])
        if (data == null) return null

        const keys = Object.keys(data)
        return keys.filter(x => data[x] !== undefined && data[x] !== null)
    }

    /**
     * Sets data in a property in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set in property.
     * @returns {Boolean} If set successfully: true; else: false
     */
    public set(key: string, value: any): boolean {
        if (!key) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)
        if (value == undefined) return false

        return this.parser.set(key, value)
    }

    /**
     * Adds a number to a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to add.
     * @returns {Boolean} If added successfully: true; else: false
     */
    public add(key: string, value: number): boolean {
        const data = this.parser.parse(key)

        if (!key) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        if (isNaN(value)) throw new LevelingError(errors.databaseManager.invalidTypes.value.number + typeof value)
        if (isNaN(data)) throw new LevelingError(errors.databaseManager.invalidTypes.target.number + typeof data)

        const numData = Number(data)
        const numValue = Number(value)

        return this.set(key, numData + numValue)
    }

    /**
     * Subtracts a number from a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to subtract.
     * @returns {Boolean} If set successfully: true; else: false
     */
    public subtract(key: string, value: number): boolean {
        const data = this.parser.parse(key)

        if (!key) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        if (isNaN(value)) throw new LevelingError(errors.databaseManager.invalidTypes.value.number + typeof value)
        if (isNaN(data)) throw new LevelingError(errors.databaseManager.invalidTypes.target.number + typeof data)

        const numData = Number(data)
        const numValue = Number(value)

        return this.set(key, numData - numValue)
    }

    /**
     * Fetches the data from the storage file.
     * @param {String} key The key in database.
     * @returns {any | false} Value from the specified key or 'false' if failed to read or 'null' if nothing found.
     */
    public fetch(key: string): any | false {
        if (!key) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        return this.parser.parse(key)
    }

    /**
     * Removes the property from the existing object in database.
     * @param {String} key The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    public remove(key: string): boolean {
        if (!key) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        return this.parser.remove(key)
    }

    /**
     * Pushes a value to a specified array from the database.
     * @param {String} key The key in database.
     * @param {any} value The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    public push(key: string, value: any): boolean {
        if (!key) return false
        if (value == undefined) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        let data = this.fetch(key) || []
        if (!Array.isArray(data) && !data.length) throw new LevelingError(errors.databaseManager.invalidTypes.target.array + typeof data)

        data.push(value)
        return this.set(key, data)
    }

    /**
     * Removes an element from a specified array in the database.
     * @param {String} key The key in database.
     * @param {Number} index The index in the array.
     * @returns {Boolean} If cleared: true; else: false.
     */
    public removeElement(key: string, index: number): boolean {
        if (!key) return false
        if (index == undefined) return false
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)

        let data = this.fetch(key)
        if (!Array.isArray(data)) throw new LevelingError(errors.databaseManager.invalidTypes.target.array + typeof data)

        data.splice(index, 1)
        return this.set(key, data)
    }

    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    public all(): object {
        return this.fetcher.fetchAll()
    }
}
/**
 * Level manager methods class.
 * @extends {LevelEmitter}
 */
export class LevelManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    public database: LevelDatabaseManager

    /**
     * Leveling manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions) {
        super()
        this.database = new LevelDatabaseManager(options)
    }

    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of levels.
     */
    public get(member: string | GuildMember | User, guild: string | Guild): number {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const level: number = this.database.fetch(`${botGuild}.${user}.level`)
        return level
    }

    /**
     * Sets the XP for specified user.
     * @fires Leveling#setLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    public set(level: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.set(`${botGuild}.${user}.level`, level)
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
    public add(level: number, member: string | GuildMember | User, guild: string | Guild, onMessage: boolean = false): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userData: LevelData = this.database.fetch(`${botGuild}.${user}`)

        if (!onMessage) this.emit('addLevel', {
            guildID: botGuild,
            userID: user,
            xp: userData.xp,
            totalXP: userData.totalXP,
            level: userData.level + level,
            maxXP: userData.maxXP,
            difference: userData.difference,
            multiplier: userData.multiplier,
            onMessage
        })

        return this.database.add(`${botGuild}.${user}.level`, level)
    }

    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    public subtract(level: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.subtract(`${botGuild}.${user}.level`, level)
    }
}
/**
 * Level Ranks manager methods class.
 */
export class LevelRanksManager {

    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: LevelDatabaseManager

    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    private client: Client

    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client: Client) {
        this.client = client
        this.database = new LevelDatabaseManager(options)
    }

    /**
    * Fetches the user's rank.
    * @param {String | GuildMember | User} member Member or it's ID
    * @param {String | Guild} guild Guild or it's ID
    * @returns {RankData} User's rank object.
    */
    get(member: string | GuildMember | User, guild: string | Guild): LevelRankData {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const rank = this.database.fetch(`${botGuild}.${user}`)

        if (!rank) return {
            userData: null,
            xp: null,
            totalXP: null,
            multiplier: null,
            level: null,
            maxXP: null,
            difference: null,
        }

        return rank
    }

    /**
     * Shows a level leaderboard for specified server.
     * @param {String | Guild} guild Guild or it's ID
     * @returns {LeaderboardData[]} Sorted leaderboard array.
     */
    public leaderboard(guild: string | Guild): LevelLeaderboardData[] {
        const isGuild = guild instanceof Guild

        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const serverData: LevelData = this.database.fetch(`${botGuild}`)
        let leaderboard = []

        if (!serverData) return []

        let users = Object.keys(serverData)
        let ranks = Object.values(serverData)

        for (let i in users) leaderboard.push({
            userID: users[i],
            xp: ranks[i].xp,
            totalXP: ranks[i].totalXP,
            level: ranks[i].level,
            maxXP: ranks[i].maxXP,
            difference: ranks[i].difference,
            multiplier: ranks[i].multiplier,
            user: this.client.users.cache.get(users[i]),
            userData: ranks[i].userData
        })

        return leaderboard.sort((a, b) => b.totalXP - a.totalXP).filter(x => !isNaN(x.totalXP))
    }

    /**
    * Sets the multiplier for specified user.
    * @param {Number} multiplier The multimplier number to set.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Boolean} If set successfully: true; else: false
    */
    setMultiplier(multiplier: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        if (isNaN(multiplier)) throw new LevelingError(errors.invalidTypes.multiplier + typeof multiplier)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        return this.database.set(`${botGuild}.${user}.multiplier`, multiplier)
    }
}
/**
 * Level Utils manager methods class.
 */
export class LevelUtilsManager {

    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    private fetcher: LevelFetchManager

    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: LevelDatabaseManager

    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    private client: Client

    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    private options: LevelOptions

    /**
     * Utils manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client?: Client) {
        this.options = options

        this.client = client

        this.database = new LevelDatabaseManager(options)
        this.fetcher = new LevelFetchManager(options)
    }

    /**
    * Checks for if the module is up to date.
    * @returns {Promise<VersionData>} This method will show is the module updated, latest version and installed version.
    */
    public async checkUpdates(): Promise<LevelUpdateData> {
        const version = require('../../package.json').version

        const packageData = await fetch('https://registry.npmjs.com/discord-leveling-super')
            .then((text: { json: () => any }) => text.json())

        if (version == packageData['dist-tags'].latest) return {
            updated: true,
            installedVersion: version,
            packageVersion: packageData['dist-tags'].latest
        }

        return {
            updated: false,
            installedVersion: version,
            packageVersion: packageData['dist-tags'].latest
        }
    }

    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    public all(): object {
        return this.fetcher.fetchAll()
    }

    /**
     * Writes the data to file.
     * @param {String} path File path to write.
     * @param {any} data Any data to write
     * @returns {Boolean} If successfully written: true; else: false.
     */
    public write(path: string, data: any): boolean {
        if (!path) return false
        if (!data) return false

        const fileData = readFileSync(path).toString()
        if (fileData == data) return false

        writeFileSync(this.options.storagePath || './leveling.json', JSON.stringify(data, null, '\t'))
        return true
    }

    /**
     * Clears the storage file.
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    public clearStorage(): boolean {
        const data = this.all()
        const stringData = String(data)

        if (stringData == '{}') return false

        this.write(this.options.storagePath || './leveling.json', '{}')
        return true
    }

    /**
    * Fully removes the guild from database.
    * @param {String} guildID Guild ID
    * @returns {Boolean} If cleared successfully: true; else: false
    */
    public removeGuild(guildID: string): boolean {
        const data = this.fetcher.fetchAll()
        const guild = data[guildID]

        if (!guildID) return false
        if (!guild) return false

        this.database.remove(guildID)
        return true
    }

    /**
     * Removes the user from database.
     * @param {String} memberID Member ID
     * @param {String} guildID Guild ID
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    public removeUser(memberID: string, guildID: string): boolean {
        const data = this.fetcher.fetchAll()

        const guild = data[guildID]
        const user = guild?.[memberID]

        if (!guildID) return false
        if (!guild) return false
        if (!user) return false

        this.database.remove(`${guildID}.${memberID}`)
        return true
    }

    /**
     * Sets the default user object for the specified member.
     * @param {String} memberID Member ID.
     * @param {String} guildID Guild ID.
     * @param {RankData} object Custom rank object to set.
     * @returns {Boolean} If reset is successful: true; else: false.
     */
    public reset(memberID: string, guildID: string, object?: LevelRankData): boolean {
        const dataObject = LevelDefaultObject

        if (!guildID) return false
        if (!memberID) return false

        if (object) return this.database.set(`${guildID}.${memberID}`, object)

        const user = this.client.users.cache.get(memberID)
        if (!user) return false

        dataObject.userData = {
            id: memberID,
            username: user.username,
            tag: user.tag,
            discriminator: user.discriminator
        }

        dataObject.xp = 0
        dataObject.totalXP = 0

        return this.database.set(`${guildID}.${memberID}`, dataObject)
    }

    /**
     * Returns a rank object with specified values.
     * @param {LevelData} options Rank object to use.
     * @returns {LevelData} Rank object with specified values.
     */
    public getRankObject(options?: LevelData): LevelData {
        const isDefined = (val: any) => val !== undefined ? val : false

        if (!options) return {
            userData: null,
            guildID: null,
            userID: null,
            xp: null,
            totalXP: null,
            level: null,
            maxXP: null,
            difference: null,
            multiplier: null
        }

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
        }
    }

    /**
     * Returns the type or instance of specified item.
     * @param {any} item The item to get the type of.
     * @returns {String} Type or instance of the item.
     */
    public typeOf(item: any): string {
        return item === null ?
            'null' :
            item === undefined ?
                'undefined' :
                item.constructor.name && item.name
                    ? item.name :
                    item.constructor.name
    }

    /**
    * Checks for is the item object and returns it.
    * @param {any} item The item to check.
    * @returns {Boolean} Is the item object or not.
    */
    public isObject(item: any): boolean {
        return !Array.isArray(item)
            && typeof item == 'object'
            && item !== null
    }

    /**
     * Checks the Leveling options object, fixes the problems in it and returns the fixed options object.
     * @param {CheckerOptions} options Option checker options.
     * @param {LevelingOptions} levelingOptions Leveling options object to check.
     * @returns {LevelingOptions} Fixed Leveling options object.
    */
    public checkOptions(options: LevelCheckerOptions = {}, levelingOptions: LevelOptions): LevelOptions {
        const unset = (obj: object, key: String) => {
            const keys = key.split('.')
            let tmp = obj

            for (let i = 0; i < keys.length; i++) {
                if ((keys.length - 1) == i) {
                    delete tmp[keys[i]]

                } else if (!this.isObject(tmp[keys[i]])) {
                    tmp[keys[i]] = {}
                }

                tmp = tmp[keys[i]]
            }
        }

        let problems = []
        let output = {}

        const keys = Object.keys(LevelDefaultOptions)
        const optionKeys = Object.keys(levelingOptions || {})

        if (typeof levelingOptions !== 'object' && !Array.isArray(levelingOptions)) {
            problems.push('options is not an object. Received type: ' + typeof levelingOptions)
            output = LevelDefaultOptions
        } else {
            if (!optionKeys.length) {
                problems.push('options object is empty.')
                return LevelDefaultOptions
            }
            for (let i of keys) {
                if (levelingOptions[i] == undefined) {
                    output[i] = LevelDefaultOptions[i]
                    if (!options.ignoreUnspecifiedOptions) problems.push(`options.${i} is not specified.`)
                }

                else {
                    output[i] = levelingOptions[i]
                }

                for (let y of Object.keys(LevelDefaultOptions[i])) {

                    if (levelingOptions[i]?.[y] == undefined || output[i]?.[y] == undefined) {
                        try {
                            output[i][y] = LevelDefaultOptions[i][y]
                        } catch (_) { }

                        if (!options.ignoreUnspecifiedOptions && isNaN(Number(y))) problems.push(`options.${i}.${y} is not specified.`)
                    }

                    else { }
                }

                if (typeof output[i] !== typeof LevelDefaultOptions[i]) {
                    if (!options.ignoreInvalidTypes) {
                        if (i == 'xp') {
                            if (typeof output[i] !== 'number' && !Array.isArray(output[i])) {
                                problems.push(`options.${i} is not a ${i == 'xp' ? 'number or array' : typeof LevelDefaultOptions[i]}. Received type: ${typeof output[i]}.`)
                                output[i] = LevelDefaultOptions[i]
                            }

                        } else {
                            problems.push(`options.${i} is not a ${typeof LevelDefaultOptions[i]}. Received type: ${typeof output[i]}.`)
                            output[i] = LevelDefaultOptions[i]
                        }
                    }
                }

                else { }

                for (let y of Object.keys(LevelDefaultOptions[i])) {

                    if (typeof output[i]?.[y] !== typeof LevelDefaultOptions[i][y]) {
                        if (!options.ignoreInvalidTypes) problems.push(`options.${i}.${y} is not a ${typeof LevelDefaultOptions[i][y]}. Received type: ${typeof output[i][y]}.`)
                        output[i][y] = LevelDefaultOptions[i][y]
                    }

                    else { }
                }
            }

            for (let i of optionKeys) {
                const defaultIndex = keys.indexOf(i)
                const objectKeys = Object.keys(levelingOptions?.[i])

                for (let y of objectKeys) {
                    const allKeys = Object.keys(LevelDefaultOptions[i] || '0')
                    const index = allKeys.indexOf(y)

                    if (!allKeys[index] && isNaN(Number(y))) {
                        problems.push(`options.${i}.${y} is an invalid option.`)
                        unset(output, `${i}.${y}`)
                    }
                }

                if (!keys[defaultIndex]) {
                    unset(output, i)
                    problems.push(`options.${i} is an invalid option.`)
                }

            }
        }


        if (options.sendLog) {
            if (options.showProblems) console.log(`Checked the options: ${problems.length ?
                `${problems.length} problems found:\n\n${problems.join('\n')}` : '0 problems found.'}`)

            if (options.sendSuccessLog && !options.showProblems) console.log(`Checked the options: ${problems.length} ${problems.length == 1 ? 'problem' : 'problems'} found.`)
        }

        if (output == LevelDefaultOptions) return levelingOptions
        else return output;
    }
}
/**
 * Level Settings manager methods class.
 */
export class LevelSettingsManager {

    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    private options: LevelOptions


    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: LevelDatabaseManager

    /**
     * Utils Manager.
     * @type {UtilsManager}
     * @private
     */
    private utils: LevelUtilsManager

    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client: Client) {
        this.options = options

        this.database = new LevelDatabaseManager(options)
        this.utils = new LevelUtilsManager(options, client)
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
    public get<K extends keyof LevelSettingsTypes>(key: K, guild: string | Guild): LevelSettingsTypes[K] {
        const isGuild = guild instanceof Guild

        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)
        if (!LevelSettingsArray.includes(key)) throw new LevelingError(errors.settingsManager.invalidKey + key)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()
        const data = this.all(botGuild)

        const dbValue = data[key]
        return dbValue
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
    public set<K extends keyof LevelSettingsTypes>(key: K, value: LevelSettingsTypes[K], guild: string | Guild): LevelSettingsTypes {
        const isGuild = guild instanceof Guild

        if (value == undefined) throw new LevelingError(errors.invalidTypes.value + typeof value)
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        if (!LevelSettingsArray.includes(key)) throw new LevelingError(errors.settingsManager.invalidKey + key)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        if (key == 'filter') this.database.set(`${botGuild}.settings.${key}`, value.toString())
        else this.database.set(`${botGuild}.settings.${key}`, value)

        return this.all(botGuild)
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
    public push<K extends keyof LevelSettingsArrays>(key: K, value: LevelSettingsArrays[K], guild: string | Guild): LevelSettingsTypes {
        const isGuild = guild instanceof Guild

        if (value == undefined) throw new LevelingError(errors.invalidTypes.value + typeof value)
        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        if (!LevelSettingsArray.includes(key)) throw new LevelingError(errors.settingsManager.invalidKey + key)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const data = this.get(key, guild)
        const type = this.utils.typeOf(data)

        if (type !== 'Array') throw new LevelingError(errors.databaseManager.invalidTypes.target.array + type)

        this.database.push(`${botGuild}.settings.${key}`, value)
        return this.all(botGuild)
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
    public unpush<K extends keyof LevelSettingsArrays>(key: K, value: any, guild: string | Guild): LevelSettingsTypes {
        const isGuild = guild instanceof Guild

        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        if (!LevelSettingsArray.includes(key)) throw new LevelingError(errors.settingsManager.invalidKey + key)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const data = this.get(key, guild)
        const index = data.indexOf(value)

        const type = this.utils.typeOf(data)
        if (type !== 'Array') throw new LevelingError(errors.databaseManager.invalidTypes.target.array + type)

        if (index == -1) throw new LevelingError(errors.settingsManager.valueNotFound(key, value))

        this.database.removeElement(`${botGuild}.settings.${key}`, index)
        return this.all(botGuild)
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
    public remove<K extends keyof LevelSettingsTypes>(key: K, guild: string | Guild): LevelSettingsTypes {
        const isGuild = guild instanceof Guild

        if (typeof key !== 'string') throw new LevelingError(errors.databaseManager.invalidTypes.key + typeof key)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        if (!LevelSettingsArray.includes(key)) throw new LevelingError(errors.settingsManager.invalidKey + key)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        this.database.remove(`${botGuild}.settings.${key}`)
        return this.all(guild)
    }

    /**
     * Fetches the server's settings object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    public all(guild: string | Guild): LevelSettingsTypes {

        const isGuild = guild instanceof Guild
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const settings: LevelSettingsTypes = this.database.fetch(`${botGuild}.settings`)

        return {
            xp: settings?.xp == null ? null : settings?.xp,
            maxXP: settings?.maxXP == null ? null : settings?.maxXP,

            multiplier: settings?.multiplier == null ? null : settings?.multiplier,

            status: settings?.status == null ? null : settings?.status,
            ignoreBots: settings?.ignoreBots == null ? null : settings?.ignoreBots,

            ignoredUsers: settings?.ignoredUsers == null ? null : settings?.ignoredUsers,
            lockedChannels: settings?.lockedChannels == null ? null : settings?.lockedChannels,

            filter: settings?.filter || null
        }
    }

    /**
     * Resets all the settings to setting that are in options object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    public reset(guild: string | Guild): LevelSettingsTypes {
        const isGuild = guild instanceof Guild
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const defaultSettings = {
            xp: this.options.xp,
            maxXP: this.options.maxXP,

            multiplier: this.options.multiplier,

            status: this.options.status,
            ignoreBots: this.options.ignoreBots,

            ignoredUsers: this.options.ignoredUsers,
            lockedChannels: this.options.lockedChannels,

            filter: this.options.filter
        }

        this.database.set(`${botGuild}.settings`, defaultSettings)

        return defaultSettings
    }
}
/**
 * Total Level XP manager methods class.
 * @extends {Emitter}
 */
export class TotalLevelXPManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: LevelDatabaseManager

    /**
     * Total XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions) {
        super()
        this.database = new LevelDatabaseManager(options)
    }

    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of total XP.
     */
    public get(member: string | GuildMember | User, guild: string | Guild): number {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const totalXP: number = this.database.fetch(`${botGuild}.${user}.totalXP`)
        return totalXP
    }

    /**
     * Sets the XP for specified user.
     * @fires Leveling#setTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    public set(totalXP: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.set(`${botGuild}.${user}.totalXP`, totalXP)
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
    public add(totalXP: number, member: string | GuildMember | User, guild: string | Guild, onMessage: boolean = false): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.add(`${botGuild}.${user}.totalXP`, totalXP)
    }

    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    public subtract(totalXP: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.subtract(`${botGuild}.${user}.totalXP`, totalXP)
    }
}
/**
 * LevelXP manager methods class.
 * @extends {Emitter}
 */
export class LevelXPManager extends LevelEmitter {

    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: LevelDatabaseManager

    /**
     * XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions) {
        super()
        this.database = new LevelDatabaseManager(options)
    }

    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    public get(member: string | GuildMember | User, guild: string | Guild): number {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const xp: number = this.database.fetch(`${botGuild}.${user}.xp`)
        return xp
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
    public set(xp: number, member: string | GuildMember | User, guild: string | Guild, onMessage?: boolean): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

        if (!onMessage) this.emit('setXP', {
            userData: userLevelData.userData,
            guildID: botGuild,
            userID: user,
            xp,
            totalXP: userLevelData.totalXP,
            level: userLevelData.level,
            maxXP: userLevelData.maxXP,
            difference: userLevelData.difference,
            multiplier: userLevelData.multiplier
        })

        return this.database.set(`${botGuild}.${user}.xp`, xp)
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
    public add(xp: number, member: string | GuildMember | User, guild: string | Guild, onMessage: boolean = false): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.add(`${botGuild}.${user}.xp`, xp)
    }

    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    public subtract(xp: number, member: string | GuildMember | User, guild: string | Guild): boolean {
        const isUser = member instanceof GuildMember || member instanceof User
        const isGuild = guild instanceof Guild

        if (typeof member !== 'string' && !isUser) throw new LevelingError(errors.invalidTypes.member + typeof member)
        if (typeof guild !== 'string' && !isGuild) throw new LevelingError(errors.invalidTypes.guild + typeof guild)

        const user = isUser ? (member as User).id : member.toString()
        const botGuild = isGuild ? (guild as Guild).id : guild.toString()

        const userLevelData: LevelData = this.database.fetch(`${botGuild}.${user}`)

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
        })

        return this.database.subtract(`${botGuild}.${user}.xp`, xp)
    }
}
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
}
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
export class LevelSystem extends LevelEmitter {
    /**
     * The Leveling Options
     * @type {LevelOptions}
     */
    public options: LevelOptions;
    /**
     * The Discord Bot (Client)
     * @type {Client}
     */
    public client: Client;
    /**
     Module Ready Status
     @type {Boolean}
     */
    public ready: boolean;
    /**
     * Module Errored Status
     * @type {Boolean}
     */
    public errored: boolean;
    /**
     * Database Checking Interval
     * @type {NodeJS.Timeout}
     */
    public interval: NodeJS.Timeout;
    /**
     * The LevelError(s)
     * @type {LevelingError}
     */
    public LevelError: typeof LevelingError;
    /**
     * Utils manager Method
     * @type {LevelUtilsManager}
     */
    public utils: LevelUtilsManager;
    /**
     * The Database
     * @type {LevelDatabaseManager}
     */
    public database: LevelDatabaseManager;
    /**
     * The (Level) Fetcher
     * @type {LevelFetchManager}
     */
    public fetcher: LevelFetchManager;
    /**
     * Settings Method
     * @type {LevelSettingsManager}
     */
    public settings: LevelSettingsManager;
    /**
     * The XP of a User
     * @type {LevelXPManager}
     */
    public xp: LevelXPManager;
    /**
     * The Level(s) of a User
     * @type {LevelManager}
     */
    public levels: LevelManager;
    /**
     * The Total XP of a User
     * @type {TotalLevelXPManager}
     */
    public totalXP: TotalLevelXPManager;
    /**
     * The Rank(s) of a User
     * @type {LevelRanksManager}
     */
    public ranks = LevelRanksManager;
    /**
     * Creates and run a new `LevelSystem`
     * @param client - The Bot (Client)
     * @param options - The Level Options
     */
    constructor(client: Client, options: LevelOptions = {}) {
        super()

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
    public kill(): LevelSystem | boolean {
        if (!this.ready) return false

        clearInterval(this.interval)
        this.ready = false

        this.LevelError = null
        this.interval = null

        this.utils = null
        this.database = null
        this.fetcher = null

        this.settings = null

        this.xp = null
        this.levels = null
        this.totalXP = null

        this.ranks = null

        this.emit('destroy')
        return this
    }

}
/**
 * The Easy Bot Emitter
 */
export const easybotemitter = new EventEmitter();
/**
 * Simple Easy Bot (Class) Event Emitter
 * @private
 */
export class EasyBotEmitter {
    constructor() {}
    /**
     * Listens to the event
     * @param {keyof ClientEvents} event Event Name
     * @param {(...args: ClientEvents[K][]) => void} listener The Event Listener
     */
    event<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K][]) => void): this {
        easybotemitter.on(event, listener);
        return this;
    }
    /**
      * Listens to the event only for once.
     * @param {keyof ClientEvents} event Event name.
     * @param {(...args: ClientEvents[K][]) => void} listener Listener function.
     */
    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K][]) => void): this {
        easybotemitter.once(event, listener);
        return this;
    }
    /**
     * Emits the Event
     * @param event - The Event
     * @param args - Event Name
     * @returns 
     */
    emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K][]): boolean {
        return easybotemitter.emit(event, ...args);
    }
}
/**
 * The EasyBotReply Options
 */
export interface EasyBotReplyOptions {
    message: string;
    embeds: any[];
    components: any[];
}
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
export class EasyBot extends EasyBotEmitter {
    /**
     * The Client Application(s)
     */
    public applications: ClientApplication;
    /**
     * The Client Actions
     */
    private actions: unknown;
    /**
     * The Client Voice Property
     */
    public voice: ClientVoiceManager;
    /**
     * A Property to Manage a User
     */
    public user: ClientUser;
    /**
     * A Property to Manage Channels
     */
    public channels: ChannelManager;
    /**
     * A Property to Manage Users
     */
    public users: UserManager;
    /**
     * A Property to Manage Guilds (Servers)
     */
    public guilds: GuildManager;
    /**
     * A Property to Manage the Bot Presence
     */
    public presence: ClientPresence;
    /**
     * The Client
     */
    private client: Client;
    /**
     * Creates a new `EasyBot`
     * @param options - The Bot Options
     */
    constructor(options: { intents: Intents[] }) {
        super();
        if (!options.intents) throw new TypeError('INTENTS_INVALID: You must set Intents to the Bot!')
        this.client = new Client({ intents: options.intents });
    }
    /**
     * Runs the `onMessage` Event
     * @example
     * .onMessage({ trigger: '!ping', reply: { message: 'Pong!' } });
     * @param options - The Message Options
     */
    onMessage(options: { trigger?: string; reply?: EasyBotReplyOptions }) {
        if (!options.trigger) throw new TypeError('INVALID_TRIGGER: You must set an Trigger to the Message. (Like "!ping")')
        if (!options.reply) throw new TypeError('INVALID_MESSAGE_REPLY: You must set an valid Reply to the Message.')
        this.client.on('messageCreate', async message => {
            if (message.content === `${options.trigger}`) {
                await message.reply({ content: options.reply.message, embeds: options.reply.embeds, components: options.reply.components })
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
    onReady(options: { consoleLog?: string | undefined; presence?: PresenceData | undefined }) {
        this.client.on('ready', () => {
            console.log(options.consoleLog);
            this.client.user.setPresence(options.presence);
        })
    }

    run(token: string) {
        if (!token) throw new TypeError('INVALID_TOKEN: You must set an valid Token to the Bot')
        this.client.login(token);
    }
}
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
export class CogManager {
    /**
     * The Cog EventEmitter
     */
    private eventEmitter: EventEmitter;
    /**
     * The Discord Bot (Client)
     */
    private client: Client;
    /**
     * The Cogs
     */
    public cogs: Map<string, string>;
    /**
     * Creates a new Instance of the `CogLoader`
     * @param {Client} client - The Discord Bot Client
     */
    constructor(client: Client) {
        this.eventEmitter = new EventEmitter();
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
    addCog(cog: { cogName: string; cogFolder: string }, code: string) {
        this.cogs.set(cog.cogName, code);
        this.eventEmitter.emit('cogAdded', cog);
    }
    /**
     * Removes a Cog
     * @param {string} cogName - The Name of the Cog to remove
     * @example
     * cogLoader.removeCog('MyCog');
    */
    removeCog(cogName: string) {
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
    executeCog(cogName: string, trigger: any) {
        if (this.cogs.has(cogName)) {
            try {
                const code = this.cogs.get(cogName);
                eval(code);
                this.eventEmitter.emit('cogExecuted', cogName);
            } catch (error) {
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
    loadCogFromFile(cog: { cogName: string; cogFolder: string }, filePath: string) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                this.eventEmitter.emit('cogLoadError', err);
            } else {
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
    loadCogsFromFolder(cogFolder: string) {
        fs.readdir(cogFolder, (err, files) => {
            if (err) {
                this.eventEmitter.emit('cogLoadError', err);
            } else {
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
    once<K extends keyof CogEvents>(
        event: K,
        listener: CogEvents[K]
    ) {
        this.eventEmitter.once(event, listener);
    }
    /**
     * Adds an event listener.
    * @param {string} event - The name of the event.
    * @param {Function} listener - The function to handle the event.
     */
    on<K extends keyof CogEvents>(
        event: K,
        listener: CogEvents[K]
    ) {
        this.eventEmitter.on(event, listener);
    }
}
