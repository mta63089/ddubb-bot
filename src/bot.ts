import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';
import { MyClient, handleCommands } from './handlers/commandHandler';
import { handleWelcome } from './handlers/welcomeHandler';

// env configuration
dotenv.config();

// Define the intents to use
const myIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageTyping,
];

// Creates a new Discord client
const client = new MyClient({ intents: myIntents });

// Set up an event listener that runs when the client is ready
client.once('ready', () => {
    console.log('Ready!');
});

// Handle commands
handleCommands(client);

// Handle Welcome
handleWelcome(client);

// login to discord with your app's token
client.login(process.env.DISCORD_APP_TOKEN);
