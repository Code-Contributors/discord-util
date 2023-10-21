import { Interaction, ColorResolvable, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from 'diswrap';
import { EventEmitter } from 'events';
export { Message as Msg } from 'discord.js';
/**
 * The BBuilder (Button Builder)
 */
export declare class BBuilder extends ButtonBuilder {
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
    contentMsg: string;
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
 * The FindEmojiGame Options
 */
export interface FindEmojiOptions {
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
export declare class FindEmojiGame extends EventEmitter {
    private options;
    private message;
    private emojis;
    private selected;
    private emoji;
    constructor(options: FindEmojiOptions);
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
export declare class SlashCommandLoader {
    private client;
    private commands;
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
