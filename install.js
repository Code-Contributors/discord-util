Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyBot = exports.EasyBotEmitter = exports.easybotemitter = exports.LevelSystem = exports.LevelXPManager = exports.TotalLevelXPManager = exports.LevelSettingsManager = exports.LevelUtilsManager = exports.LevelRanksManager = exports.LevelManager = exports.LevelDatabaseManager = exports.LevelDotParser = exports.LevelFetchManager = exports.LevelingErros = exports.LevelSettingsArray = exports.LevelDefaultOptions = exports.LevelDefaultObject = exports.LevelingError = exports.LevelEmitter = exports.levelemitter = exports.CustomLogger = exports.ErrorHandler = exports.CogManager = exports.reply = exports.DataBaseManager = exports.DiscordDataBase = exports.SlashCommandLoader = exports.SlashCommandOptionTypes = exports.MemoryGame = exports.Approve = exports.shuffleArray = exports.getAlphaEmoji = exports.oppDirection = exports.move = exports.decode = exports.formatMessage = exports.getNumEmoji = exports.disableButtons = exports.BBuilder = exports.Intents = exports.Msg = void 0;
const discord_js_1 = require("discord.js");
Object.defineProperty(exports, "Intents", { enumerable: true, get: function () { return discord_js_1.GatewayIntentBits; } });
const events_1 = require("events");
var discord_js_2 = require("discord.js");
Object.defineProperty(exports, "Msg", { enumerable: true, get: function () { return discord_js_2.Message; } });
const fs = require("fs");
const fs_1 = require("fs");

const colors = {
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    blue: '\x1b[34m'
}

console.log()
console.log(`${colors.green}╔═══════════════════════════════════════════════════════════════════╗`)
console.log(`${colors.green}║ @ discord-utilies                                  - [] X ║`)
console.log(`${colors.green}║═══════════════════════════════════════════════════════════════════║`)
console.log(`${colors.green}║ ${colors.cyan}Thank you for installing Discord Utilies!                  ${colors.green}║`)
console.log(`${colors.green}║═══════════════════════════════════════════════════════════════════║`)
console.log(`${colors.green}║ If you have any questions or need help, join the Support Server:  ${colors.green}║`)
console.log(`${colors.green}║ ${colors.blue}https://discord.gg/xw5CyEPfPA                                   ${colors.green}║`)
console.log(`${colors.green}╚═══════════════════════════════════════════════════════════════════╝\x1b[37m`)
console.log()
