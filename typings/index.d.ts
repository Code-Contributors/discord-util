/// <reference types="node" />
/// <reference types="node" />
import { Channel, BaseMessageOptions, Interaction, CommandInteraction, ColorResolvable, Message, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Client, UserManager, User, AttachmentBuilder, GuildMember, Guild, ClientEvents, GatewayIntentBits as Intents, PresenceData, ClientUser, ChannelManager, GuildManager, ClientPresence, ClientVoiceManager, ClientApplication } from 'discord.js';
import { EventEmitter } from 'events';
export { Message as Msg } from 'discord.js';
export { Intents };
/**
 * The BBuilder (Button Builder)
 */
export declare class BBuilder extends ButtonBuilder {
    /**
     *
     * @param options The Options
     */
    constructor(options: any);
    setStyle(style: ButtonStyle): this;
    removeLabel(): this;
    removeEmoji(): this;
}
/**
 * The `disableButtons` Function. With this you can Disable Buttons
 * @param components - The Components
 * @returns
 */
export declare function disableButtons(components: any[]): any[];
/**
 * The `getNumEmoji` Function. Get a Number Emoji using this Function
 * @param number - The Number
 * @returns
 */
export declare function getNumEmoji(number: number): string;
/**
 * The `formatMessage` Function. This formats Messages into d.js Code
 * @param options - The Options
 * @param contentMsg - The Content Message
 * @returns
 */
export declare function formatMessage(options: {
    message: any;
    opponent?: any;
    contentMsg: string;
}, contentMsg: string): string;
/**
 * The `decode` Function. Decode Content with 'html entities'
 * @param content - The Content to Decode
 * @returns
 */
export declare function decode(content: string): string;
/**
 * The `move` Function.
 * @param pos - The Position
 * @param direction - The Direction
 * @returns
 */
export declare function move(pos: {
    x: number;
    y: number;
}, direction: 'up' | 'down' | 'left' | 'right'): {
    x: number;
    y: number;
};
/**
 * The `oppDirection` Function.
 * Manage oppDirections in your Code
 * @param direction - The Direction(s)
 * @returns
 */
export declare function oppDirection(direction: 'up' | 'down' | 'left' | 'right'): 'up' | 'down' | 'left' | 'right';
/**
 * The `getAlphaEmoji` Function.
 * Get an AlphaEmoji based on the Letter.
 * @param letter - The Letter
 * @returns
 */
export declare function getAlphaEmoji(letter: string): string | string[];
/**
 * The `shuffleArray` Function.
 * Shuffle your Arrays easily
 * @param array - The Array
 * @returns
 */
export declare function shuffleArray<T>(array: T[]): T[];
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
export declare class Approve extends EventEmitter {
    player1Turn: boolean;
    options: ApproveOptions;
    message: any;
    opponent: any;
    /**
     * Create a new `Approve` instance
     * @param options - The Options
     */
    constructor(options: ApproveOptions);
    /**
     *
     * @param content - The Message Content
     * @returns
     */
    private sendMessage;
    approve(): Promise<unknown>;
    formatTurnMessage(options: ApproveOptions, contentMsg: string): any;
}
/**
 * The ButtonStyle Options
 */
export interface ButtonStyleOptions extends ApproveOptions {
    Primary: ButtonStyle.Primary;
    Secondary: ButtonStyle.Secondary;
    Success: ButtonStyle.Success;
    Danger: ButtonStyle.Danger;
    Link: ButtonStyle.Link;
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
export declare class MemoryGame extends EventEmitter {
    private options;
    private message;
    private emojis;
    private selected;
    private emoji;
    /**
     * Create a new `MemoryGame`
     * @param options - The Options
     */
    constructor(options: MemoryOptions);
    /**
     *
     * @param content - The Message Content
     * @returns
     */
    sendMessage(content: any): Promise<any>;
    /**
     * Starts the Game
     */
    startGame(): Promise<void>;
    /**
     * The GameOver Event
     * @param msg - The GameOver Message
     * @param result - The End-Result
     * @returns
     */
    gameOver(msg: any, result: boolean): any;
    /**
     * Get Components
     * @param showEmoji - The showEmoji
     * @returns
     */
    getComponents(showEmoji: boolean): ActionRowBuilder<import("@discordjs/builders").AnyComponentBuilder>[];
}
/**
 * Defines a List of available Slash Command Option Types
 * @ https://discord.com/developers/docs/interactions/application-commands
 */
export declare enum SlashCommandOptionTypes {
    SUB_COMMAND = "SUB_COMMAND",
    SUB_COMMAND_GROUP = "SUB_COMMAND_GROUP",
    STRING = "STRING",
    INTEGER = "INTEGER",
    BOOLEAN = "BOOLEAN",
    USER = "USER",
    CHANNEL = "CHANNEL",
    ROLE = "ROLE"
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
export declare class SlashCommandLoader {
    private client;
    private commands;
    /**
     * Create a new `SlashCommandLoader`
     * @param client - The Client (Bot)
     */
    constructor(client: Client);
    /**
     * Load all Slash commands from the specified directory.
     * @param commandsFolder The directory where the Slash command files are located.
     */
    loadCommands(commandsFolder: string): void;
    /**
     * Handle incoming interactions (Slash commands).
     * @param interaction The incoming interaction.
     */
    handleInteraction(interaction: Interaction): Promise<void>;
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
export declare class DiscordDataBase {
    private databasePath;
    private data;
    /**
     * Create a new `DiscordDataBase` instance
     * @param path - The Path to the Database
     */
    constructor(path: string);
    /**
     * The `loadDatabase` Function. This loads your Data
     * @returns
     */
    private loadDatabase;
    /**
     * The `saveDatabase` Function. This save your Data
     */
    private saveDatabase;
    /**
     * The `set` Function. This sets Data to your Database
     * @param key - The Key
     * @param value - The Value
     */
    set(key: string, value: any): void;
    /**
     * The `get` Function. With this you can get/load Data from your DataBase
     * @param key - The Key
     * @returns
     */
    get(key: string): any;
    /**
     * The `delete` Funtion. This deletes Data in your Database
     * @param key - The Key
     */
    delete(key: string): void;
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
export declare class DataBaseManager {
    private databasePath;
    /**
     * Create a new `DataBaseManager` instance.
     * @param databasePath - The Path to the Database File.
     */
    constructor(databasePath: string);
    /**
     * Create a new Database file
     */
    createDatabase(): void;
    /**
     * Delete the Database file
     */
    deleteDatabase(): void;
    /**
     * Get data from the database by key.
     * @param key - The key to retrieve data.
     * @returns The data associated with the given key
     */
    getData(key: string): any;
    /**
     Save data into the database.
     * @param key - The key to associate with the data.
     * @param value - The data to save.
     */
    setData(key: string, value: any): void;
    /**
     * Delete data from the database by key.
     * @param key - The key to delete data.
     */
    deleteData(key: string): void;
    /**
     * Private Helper Method 1
     * @returns
     */
    private loadDatabase;
    /**
     * Private Helper Method 2
     * @param data - The Data
     */
    private saveDatabase;
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
export declare function reply(options: ReplyOptions): Promise<void>;
/**
 * The `ErrorHandler` Class.
 * This class provides methods for handling and reporting errors.
 */
export declare class ErrorHandler {
    /**
     * Log an Error Message to the console
     * @param error - The Error Message or Object to log
     */
    static logError(error: any): void;
    /**
     * Send an error message to a specific channel.
     * @param channel - The TextChannel to send the error message to.
     * @param error - The error message or object to send.
     */
    static sendErrorToChannel(channel: TextChannel, error: any): void;
    /**
     * Handle an error and provide a user-friendly response to an interaction.
     * @param interaction - The CommandInteraction to respond to.
     * @param error - The error message or object to handle.
     */
    static handleInteractionError(interaction: CommandInteraction, error: any): void;
    /**
     * Handle an error and provide a user-friendly response to a regular message.
     * @param channel - The TextChannel to send the response to.
     * @param error - The error message or object to handle.
     */
    static handleTextChannelError(channel: TextChannel, error: any): void;
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
export declare class CustomLogger {
    private prefix;
    /**
     * Creates a new instance of the `CustomLogger`.
     * @param prefix - An optional prefix to prepend to all log messages.
     */
    constructor(prefix?: string);
    /**
     * Logs an information message.
     * @param message - The message to be logged.
     */
    info(message: string): void;
    /**
     * Logs an error message.
     * @param message - The error message to be logged.
     */
    error(message: string): void;
    /**
     * Logs a warning.
     * @param message - The warning to be logged.
     */
    warn(message: string): void;
    /**
    * Internal logging of the message.
    * @param message - The message to log.
     */
    private log;
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
    sendMessage(msg: string | EmbedBuilder | AttachmentBuilder | BaseMessageOptions, channel?: string | Channel): Promise<Message>;
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
    cogAdded: (cog: {
        cogName: string;
        cogFolder: string;
    }) => void;
    cogRemoved: (cogName: string) => void;
    cogExecuted: (cogName: string) => void;
    cogError: (cog: {
        cogName: string;
        error: Error;
    }) => void;
    cogLoadError: (error: Error) => void;
    cogLoaded: (cog: {
        cogName: string;
        cogFolder: string;
    }) => void;
}
export interface LevelData {
    /**
    * Guild ID.
    */
    guildID: string;
    /**
     * User ID.
     */
    userID: string;
    /**
     * The user data that is stored in database.
     * Use it in case if the requested user
     * is not on your server.
     */
    userData: LevelUserData;
    /**
     * User's amount of XP.
     */
    xp: number;
    /**
     * User's total amount of XP.
     */
    totalXP: number;
    /**
     * User's level.
     */
    level: number;
    /**
    * How much XP in total the user need to reach the next level.
    */
    maxXP: number;
    /**
    * The difference between max XP and current amount of XP. It shows how much XP he need to reach the next level.
    */
    difference: number;
    /**
     * User's XP multiplier.
     */
    multiplier: number;
}
export interface LevelEvents {
    /**
     * Level UP
     */
    levelUp: LevelUpData;
    setLevel: LevelData;
    addLevel: LevelXPData;
    subtractLevel: LevelData;
    setXP: LevelData;
    addXP: LevelXPData & {
        /**
         * How much XP the user gained after sending a message
         */
        gainedXP: number;
    };
    subtractXP: LevelData;
    setTotalXP: LevelData;
    addTotalXP: LevelXPData & {
        /**
         * How much XP the user gained after sending a message
         */
        gainedXP: number;
    };
    subtractTotalXP: LevelData;
    ready: void;
    destroy: void;
}
/**
 * The Level Emitter
 */
export declare const levelemitter: EventEmitter;
/**
 * Simple Level event emitter with only important emitter methods.
 * @private
 */
export declare class LevelEmitter {
    constructor();
    /**
     * Listens to the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    on<K extends keyof LevelEvents>(event: K, listener: (...args: LevelEvents[K][]) => void): this;
    /**
     * Listens to the event only for once.
     * @param {keyof LevelEvents} event Event name.
     * @param {(...args: LevelEvents[K][]) => void} listener Listener function.
     */
    once<K extends keyof LevelEvents>(event: K, listener: (...args: LevelEvents[K][]) => void): this;
    /**
     * Emits the event.
     * @param {keyof LevelEvents} event Event name.
     * @param {LevelEvents[K][]} args Listener arguments.
     */
    emit<K extends keyof LevelEvents>(event: K, ...args: LevelEvents[K][]): boolean;
}
/**
 * The Updater Options
 */
export interface LevelUpdaterOptions {
    /**
     * Sends the update state message in console on start. Default: true.
     */
    checkUpdates?: boolean;
    /**
     * Sends the message in console on start if module is up to date. Default: true.
     */
    upToDateMessage?: boolean;
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
    userID: String;
    level: Number;
    totalXP: Number;
    xp: Number;
    maxXP: Number;
    difference: Number;
    user: User;
    /**
     * The user data that is stored in the database
     * Use it in case if the requested User is not on your Server
     */
    userData: LevelUserData;
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
    errorHandler?: LevelErrorHandlerOptions;
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
    multiplier: number;
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
    filter: string | Function | LevelFilterFunction;
}
/**
 * The Level Setting Arrays
 */
export interface LevelSettingsArrays {
    ignoredUsers: string[];
    lockedChannels: string[];
}
/**
 * Level Version data object
 */
export interface LevelUpdateData {
    /**
     * Checks for if module is up to date
     */
    updated: boolean;
    /**
     * Shows an installed version of the module
     */
    installedVersion: string;
    /**
     * Shows the latest Version of the module
     */
    packageVersion: string;
}
/**
 * The `LevelingError` Class
 */
export declare class LevelingError extends Error {
    /**
     * Creates an `LevelingError` instance.
     * @param {String | Error} message Error message.
     */
    constructor(message?: any);
}
/**
 * This is the Structure of the JSON Database File
 */
export declare const LevelDefaultObject: {
    userData: {
        id: string;
        username: string;
        tag: string;
        discriminator: string;
    };
    xp: number;
    totalXP: number;
    multiplier: number;
    level: number;
    maxXP: number;
    difference: number;
};
/**
 * The Default Level Options
 */
export declare const LevelDefaultOptions: LevelOptions;
/**
 * The Level Setting Array(s)
 */
export declare const LevelSettingsArray: string[];
/**
 * This are the Leveling Errors
 */
export declare const LevelingErros: {
    noClient: string;
    invalidClient: string;
    notReady: string;
    noDependencies: string;
    noDiscordJS: string;
    oldNodeVersion: string;
    oldDJSVersion: string;
    invalidStorage: string;
    wrongStorageData: string;
    invalidTypes: {
        level: string;
        xp: string;
        member: string;
        guild: string;
        multiplier: string;
        value: string;
    };
    settingsManager: {
        invalidKey: string;
        valueNotFound(setting: string, value: string): string;
    };
    databaseManager: {
        invalidTypes: {
            key: string;
            target: {
                number: string;
                array: string;
            };
            value: {
                number: string;
                array: string;
            };
        };
    };
    sendMessage: {
        invalidTypes: {
            msg: string;
            channel: string;
        };
        channelNotFound: string;
        invalidChannelType: string;
    };
    lockedChannels: {
        invalidTypes: string;
        invalidChannels(channelsArray: string[]): string;
    };
    ignoredUsers: {
        invalidTypes: string;
        invalidUsers(usersArray: string[]): string;
    };
    ignoredGuilds: {
        invalidTypes: string;
        invalidGuilds(guildsArray: string[]): string;
    };
    reservedName(name: string): string;
};
/**
 * The `LevelFetchManager`. This fetchs Levels etc.
 */
export declare class LevelFetchManager {
    /**
     * Storage Path.
     * @type {String}
     * @private
     */
    private storagePath;
    /**
     * Fetch manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions);
    /**
     * Gets the amount of XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    fetchXP(member: string | GuildMember | User, guild: string | Guild): number;
    /**
    * Gets the amount of total XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchTotalXP(member: string | GuildMember | User, guild: string | Guild): number;
    /**
    * Gets the amount of levels for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchLevels(member: string | GuildMember | User, guild: string | Guild): number;
    /**
    * Gets the amount of max XP for specified user.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchMaxXP(member: string | GuildMember | User, guild: string | Guild): number;
    /**
    * Gets the difference between max XP and user's XP.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Number} Amount of XP.
    */
    fetchDifference(member: string | GuildMember | User, guild: string | Guild): number;
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    fetchAll(): object;
}
/**
 * Level Dot Parser
 * @private
 */
export declare class LevelDotParser {
    options: LevelOptions;
    storagePath: string;
    fetcher: LevelFetchManager;
    /**
     * Leveling constructor options object. There's only needed options object properties for this manager to work properly.
     * @param {Object} options Constructor options object.
     * @param {String} options.storagePath Full path to a JSON file. Default: './leveling.json'.
     */
    constructor(options: LevelOptions);
    /**
     * Parses the key and fetches the value from database.
     * @param {String} key The key in database.
     * @returns {any | false} The data from database or 'false' if failed to parse or 'null' if nothing found.
     */
    parse(key: string): any | false;
    /**
     * Parses the key and sets the data in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set.
     * @returns {Boolean} If set successfully: true; else: false
     */
    set(key: string, value: any): boolean;
    /**
     * Parses the key and removes the data from database.
     * @param {String} key The key in database.
     * @returns {Boolean} If removed successfully: true; else: false
     */
    remove(key: string): boolean;
    /**
     * Checks for is the item object and returns it.
     * @param {any} item The item to check.
     * @returns {Boolean} Is the item object or not.
    */
    isObject(item: any): boolean;
}
/**
 * Level Database manager methods class.
 */
export declare class LevelDatabaseManager {
    /**
     * Dor Parser.
     * @type {DotParser}
     * @private
     */
    private parser;
    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    private fetcher;
    /**
     * Database manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions);
    /**
     * Gets a list of keys in database.
     * @param {String} key The key in database.
     * @returns {string[]} An array with all keys in database or 'null' if nothing found.
     */
    keyList(key: string): string[];
    /**
     * Sets data in a property in database.
     * @param {String} key The key in database.
     * @param {any} value Any data to set in property.
     * @returns {Boolean} If set successfully: true; else: false
     */
    set(key: string, value: any): boolean;
    /**
     * Adds a number to a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to add.
     * @returns {Boolean} If added successfully: true; else: false
     */
    add(key: string, value: number): boolean;
    /**
     * Subtracts a number from a property data in database.
     * @param {String} key The key in database.
     * @param {Number} value Any number to subtract.
     * @returns {Boolean} If set successfully: true; else: false
     */
    subtract(key: string, value: number): boolean;
    /**
     * Fetches the data from the storage file.
     * @param {String} key The key in database.
     * @returns {any | false} Value from the specified key or 'false' if failed to read or 'null' if nothing found.
     */
    fetch(key: string): any | false;
    /**
     * Removes the property from the existing object in database.
     * @param {String} key The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    remove(key: string): boolean;
    /**
     * Pushes a value to a specified array from the database.
     * @param {String} key The key in database.
     * @param {any} value The key in database.
     * @returns {Boolean} If cleared: true; else: false.
     */
    push(key: string, value: any): boolean;
    /**
     * Removes an element from a specified array in the database.
     * @param {String} key The key in database.
     * @param {Number} index The index in the array.
     * @returns {Boolean} If cleared: true; else: false.
     */
    removeElement(key: string, index: number): boolean;
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    all(): object;
}
/**
 * Level manager methods class.
 * @extends {LevelEmitter}
 */
export declare class LevelManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    database: LevelDatabaseManager;
    /**
     * Leveling manager methods class.
     * @param {LevelOptions} options Leveling options object.
     */
    constructor(options: LevelOptions);
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of levels.
     */
    get(member: string | GuildMember | User, guild: string | Guild): number;
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(level: number, member: string | GuildMember | User, guild: string | Guild): boolean;
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(level: number, member: string | GuildMember | User, guild: string | Guild, onMessage?: boolean): boolean;
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractLevel
     * @param {Number} level Amount of levels.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(level: number, member: string | GuildMember | User, guild: string | Guild): boolean;
}
/**
 * Level Ranks manager methods class.
 */
export declare class LevelRanksManager {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database;
    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    private client;
    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client: Client);
    /**
    * Fetches the user's rank.
    * @param {String | GuildMember | User} member Member or it's ID
    * @param {String | Guild} guild Guild or it's ID
    * @returns {RankData} User's rank object.
    */
    get(member: string | GuildMember | User, guild: string | Guild): LevelRankData;
    /**
     * Shows a level leaderboard for specified server.
     * @param {String | Guild} guild Guild or it's ID
     * @returns {LeaderboardData[]} Sorted leaderboard array.
     */
    leaderboard(guild: string | Guild): LevelLeaderboardData[];
    /**
    * Sets the multiplier for specified user.
    * @param {Number} multiplier The multimplier number to set.
    * @param {String | GuildMember | User} member Member or it's ID.
    * @param {String | Guild} guild Guild or it's ID.
    * @returns {Boolean} If set successfully: true; else: false
    */
    setMultiplier(multiplier: number, member: string | GuildMember | User, guild: string | Guild): boolean;
}
/**
 * Level Utils manager methods class.
 */
export declare class LevelUtilsManager {
    /**
     * Fetch Manager.
     * @type {FetchManager}
     * @private
     */
    private fetcher;
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database;
    /**
     * Discord Bot Client.
     * @type {Client}
     * @private
     */
    private client;
    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    private options;
    /**
     * Utils manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client?: Client);
    /**
    * Checks for if the module is up to date.
    * @returns {Promise<VersionData>} This method will show is the module updated, latest version and installed version.
    */
    checkUpdates(): Promise<LevelUpdateData>;
    /**
    * Fetches the entire database.
    * @returns {Object} Database contents
    */
    all(): object;
    /**
     * Writes the data to file.
     * @param {String} path File path to write.
     * @param {any} data Any data to write
     * @returns {Boolean} If successfully written: true; else: false.
     */
    write(path: string, data: any): boolean;
    /**
     * Clears the storage file.
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    clearStorage(): boolean;
    /**
    * Fully removes the guild from database.
    * @param {String} guildID Guild ID
    * @returns {Boolean} If cleared successfully: true; else: false
    */
    removeGuild(guildID: string): boolean;
    /**
     * Removes the user from database.
     * @param {String} memberID Member ID
     * @param {String} guildID Guild ID
     * @returns {Boolean} If cleared successfully: true; else: false
     */
    removeUser(memberID: string, guildID: string): boolean;
    /**
     * Sets the default user object for the specified member.
     * @param {String} memberID Member ID.
     * @param {String} guildID Guild ID.
     * @param {RankData} object Custom rank object to set.
     * @returns {Boolean} If reset is successful: true; else: false.
     */
    reset(memberID: string, guildID: string, object?: LevelRankData): boolean;
    /**
     * Returns a rank object with specified values.
     * @param {LevelData} options Rank object to use.
     * @returns {LevelData} Rank object with specified values.
     */
    getRankObject(options?: LevelData): LevelData;
    /**
     * Returns the type or instance of specified item.
     * @param {any} item The item to get the type of.
     * @returns {String} Type or instance of the item.
     */
    typeOf(item: any): string;
    /**
    * Checks for is the item object and returns it.
    * @param {any} item The item to check.
    * @returns {Boolean} Is the item object or not.
    */
    isObject(item: any): boolean;
    /**
     * Checks the Leveling options object, fixes the problems in it and returns the fixed options object.
     * @param {CheckerOptions} options Option checker options.
     * @param {LevelingOptions} levelingOptions Leveling options object to check.
     * @returns {LevelingOptions} Fixed Leveling options object.
    */
    checkOptions(options: LevelCheckerOptions, levelingOptions: LevelOptions): LevelOptions;
}
/**
 * Level Settings manager methods class.
 */
export declare class LevelSettingsManager {
    /**
     * Leveling Options.
     * @type {LevelingOptions}
     * @private
     */
    private options;
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database;
    /**
     * Utils Manager.
     * @type {UtilsManager}
     * @private
     */
    private utils;
    /**
     * Ranks manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions, client: Client);
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
    get<K extends keyof LevelSettingsTypes>(key: K, guild: string | Guild): LevelSettingsTypes[K];
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
    set<K extends keyof LevelSettingsTypes>(key: K, value: LevelSettingsTypes[K], guild: string | Guild): LevelSettingsTypes;
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
    push<K extends keyof LevelSettingsArrays>(key: K, value: LevelSettingsArrays[K], guild: string | Guild): LevelSettingsTypes;
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
    unpush<K extends keyof LevelSettingsArrays>(key: K, value: any, guild: string | Guild): LevelSettingsTypes;
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
    remove<K extends keyof LevelSettingsTypes>(key: K, guild: string | Guild): LevelSettingsTypes;
    /**
     * Fetches the server's settings object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    all(guild: string | Guild): LevelSettingsTypes;
    /**
     * Resets all the settings to setting that are in options object.
     * @param {String} guild Guild or it's ID.
     * @returns {SettingsTypes} The server settings object.
     */
    reset(guild: string | Guild): LevelSettingsTypes;
}
/**
 * Total Level XP manager methods class.
 * @extends {Emitter}
 */
export declare class TotalLevelXPManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database;
    /**
     * Total XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions);
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of total XP.
     */
    get(member: string | GuildMember | User, guild: string | Guild): number;
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(totalXP: number, member: string | GuildMember | User, guild: string | Guild): boolean;
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(totalXP: number, member: string | GuildMember | User, guild: string | Guild, onMessage?: boolean): boolean;
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractTotalXP
     * @param {Number} totalXP Amount of total XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(totalXP: number, member: string | GuildMember | User, guild: string | Guild): boolean;
}
/**
 * LevelXP manager methods class.
 * @extends {Emitter}
 */
export declare class LevelXPManager extends LevelEmitter {
    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database;
    /**
     * XP manager methods class.
     * @param {LevelingOptions} options Leveling options object.
     */
    constructor(options: LevelOptions);
    /**
     * Gets the XP for specified user.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Number} Amount of XP.
     */
    get(member: string | GuildMember | User, guild: string | Guild): number;
    /**
     * Sets the XP for specified user.
     * @fires Leveling#setXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If set successfully: true, else: false.
     */
    set(xp: number, member: string | GuildMember | User, guild: string | Guild, onMessage?: boolean): boolean;
    /**
     * Adds the XP for specified user.
     * @fires Leveling#addXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @param {Boolean} onMessage The value will be true if the method was called on 'messageCreate' bot event.
     * @returns {Boolean} If added successfully: true, else: false.
     */
    add(xp: number, member: string | GuildMember | User, guild: string | Guild, onMessage?: boolean): boolean;
    /**
     * Subtracts the XP for specified user.
     * @fires Leveling#subtractXP
     * @param {Number} xp Amount of XP.
     * @param {String | GuildMember | User} member Member or it's ID.
     * @param {String | Guild} guild Guild or it's ID.
     * @returns {Boolean} If subtracted successfully: true, else: false.
     */
    subtract(xp: number, member: string | GuildMember | User, guild: string | Guild): boolean;
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
export declare class LevelSystem extends LevelEmitter {
    /**
     * The Leveling Options
     * @type {LevelOptions}
     */
    options: LevelOptions;
    /**
     * The Discord Bot (Client)
     * @type {Client}
     */
    client: Client;
    /**
     Module Ready Status
     @type {Boolean}
     */
    ready: boolean;
    /**
     * Module Errored Status
     * @type {Boolean}
     */
    errored: boolean;
    /**
     * Database Checking Interval
     * @type {NodeJS.Timeout}
     */
    interval: NodeJS.Timeout;
    /**
     * The LevelError(s)
     * @type {LevelingError}
     */
    LevelError: typeof LevelingError;
    /**
     * Utils manager Method
     * @type {LevelUtilsManager}
     */
    utils: LevelUtilsManager;
    /**
     * The Database
     * @type {LevelDatabaseManager}
     */
    database: LevelDatabaseManager;
    /**
     * The (Level) Fetcher
     * @type {LevelFetchManager}
     */
    fetcher: LevelFetchManager;
    /**
     * Settings Method
     * @type {LevelSettingsManager}
     */
    settings: LevelSettingsManager;
    /**
     * The XP of a User
     * @type {LevelXPManager}
     */
    xp: LevelXPManager;
    /**
     * The Level(s) of a User
     * @type {LevelManager}
     */
    levels: LevelManager;
    /**
     * The Total XP of a User
     * @type {TotalLevelXPManager}
     */
    totalXP: TotalLevelXPManager;
    /**
     * The Rank(s) of a User
     * @type {LevelRanksManager}
     */
    ranks: typeof LevelRanksManager;
    /**
     * Creates and run a new `LevelSystem`
     * @param client - The Bot (Client)
     * @param options - The Level Options
     */
    constructor(client: Client, options?: LevelOptions);
    /**
    * Kills the Level System.
    * @fires LevelSytem#destroy
    * @returns {Leveling | boolean} Leveling instance.
    */
    kill(): LevelSystem | boolean;
}
/**
 * The Easy Bot Emitter
 */
export declare const easybotemitter: EventEmitter;
/**
 * Simple Easy Bot (Class) Event Emitter
 * @private
 */
export declare class EasyBotEmitter {
    constructor();
    /**
     * Listens to the event
     * @param {keyof ClientEvents} event Event Name
     * @param {(...args: ClientEvents[K][]) => void} listener The Event Listener
     */
    event<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K][]) => void): this;
    /**
      * Listens to the event only for once.
     * @param {keyof ClientEvents} event Event name.
     * @param {(...args: ClientEvents[K][]) => void} listener Listener function.
     */
    once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K][]) => void): this;
    /**
     * Emits the Event
     * @param event - The Event
     * @param args - Event Name
     * @returns
     */
    emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K][]): boolean;
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
export declare class EasyBot extends EasyBotEmitter {
    /**
     * The Client Application(s)
     */
    applications: ClientApplication;
    /**
     * The Client Actions
     */
    private actions;
    /**
     * The Client Voice Property
     */
    voice: ClientVoiceManager;
    /**
     * A Property to Manage a User
     */
    user: ClientUser;
    /**
     * A Property to Manage Channels
     */
    channels: ChannelManager;
    /**
     * A Property to Manage Users
     */
    users: UserManager;
    /**
     * A Property to Manage Guilds (Servers)
     */
    guilds: GuildManager;
    /**
     * A Property to Manage the Bot Presence
     */
    presence: ClientPresence;
    /**
     * The Client
     */
    private client;
    /**
     * Creates a new `EasyBot`
     * @param options - The Bot Options
     */
    constructor(options: {
        intents: Intents[];
    });
    /**
     * Runs the `onMessage` Event
     * @example
     * .onMessage({ trigger: '!ping', reply: { message: 'Pong!' } });
     * @param options - The Message Options
     */
    onMessage(options: {
        trigger?: string;
        reply?: EasyBotReplyOptions;
    }): void;
    /**
     * Runs the `ready` Event
     * @example
     * .onReady({ consoleLog: `${bot.user.username} is ready`, presence: { status: 'idle' } });
     * @param options - The Ready Options
     */
    onReady(options: {
        consoleLog?: string | undefined;
        presence?: PresenceData | undefined;
    }): void;
    run(token: string): void;
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
export declare class CogManager {
    /**
     * The Cog EventEmitter
     */
    private eventEmitter;
    /**
     * The Discord Bot (Client)
     */
    private client;
    /**
     * The Cogs
     */
    cogs: Map<string, string>;
    /**
     * Creates a new Instance of the `CogLoader`
     * @param {Client} client - The Discord Bot Client
     */
    constructor(client: Client);
    /**
     *
     * @param {Object} cog - Cog Information, including name and folder
     * @param {string} code - The JavaScript Code of the Cog
     * @example
     * cogLoader.addCog({ cogName: 'MyCog', cogFolder: './cogs' }, '...');
     */
    addCog(cog: {
        cogName: string;
        cogFolder: string;
    }, code: string): void;
    /**
     * Removes a Cog
     * @param {string} cogName - The Name of the Cog to remove
     * @example
     * cogLoader.removeCog('MyCog');
    */
    removeCog(cogName: string): void;
    /**
     * Execute (Runs) a Cog
     * @param {string} cogName - The Name of the Cog to execute
     * @param {any} trigger - The Trigger that triggers the Cog (like 'message', or 'interaction')
     * @example
     * cogLoader.executeCog('MyCog', message);
     */
    executeCog(cogName: string, trigger: any): void;
    /**
    * Loads a Cog from a file.
    * @param {Object} cog - Cog information, including name and folder.
    * @param {string} filePath - The path to the Cog file.
    * @example
    * cogLoader.loadCogFromFile({ cogName: 'MyCog', cogFolder: 'Cogs' }, 'cog1.js');
     */
    loadCogFromFile(cog: {
        cogName: string;
        cogFolder: string;
    }, filePath: string): void;
    /**
    * Loads all Cog files from a folder.
    * @param {string} cogFolder - The folder where Cog files are stored.
    * @example
    * cogLoader.loadCogsFromFolder('Cogs');
     */
    loadCogsFromFolder(cogFolder: string): void;
    /**
     * Adds a one-time event listener.
    * @param {string} event - The name of the event.
    * @param {Function} listener - The function to handle the event.
     */
    once<K extends keyof CogEvents>(event: K, listener: CogEvents[K]): void;
    /**
     * Adds an event listener.
    * @param {string} event - The name of the event.
    * @param {Function} listener - The function to handle the event.
     */
    on<K extends keyof CogEvents>(event: K, listener: CogEvents[K]): void;
}
