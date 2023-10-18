"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
// env configuration
dotenv_1.default.config();
// Define the intents to use
const myIntents = [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages];
// Creates a new Discord client
const client = new discord_js_1.Client({ intents: myIntents });
// Set up an event listener that runs when the client is ready
client.once('ready', () => {
    console.log('Ready!');
});
// This event will run whenever a message is received
client.on('messageCreate', (message) => {
    // Ignore messages that aren't from a guild or are from a bot
    if (!message.guild || message.author.bot)
        return;
    // If the message content starts with "!ping", send "Pong!" to the same channel
    if (message.content.startsWith('!ping')) {
        message.channel.send('Pong!');
    }
});
// login to discord with your app's token
client.login(process.env.DISCORD_APP_TOKEN);
