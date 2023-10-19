import dotenv from 'dotenv';
import { GatewayIntentBits, Partials } from 'discord.js';
import { MyClient, handleCommands } from './handlers/commandHandler';
import { handleWelcome } from './handlers/welcomeHandler';
import { ScoreRow } from './api/trivia';
import * as cron from 'node-cron';
import db from './db/database';

// env configuration
dotenv.config();

// Schedule a task to run every minute to check for trivia reset
cron.schedule('0 0 * * *', () => {
    // Get the current time
    const now = new Date();
    // Fetch all scores from the database
    db.all('SELECT * FROM scores', (err, rows: ScoreRow[]) => {
        if (err) {
            console.error(err.message);
            return;
        }
        // Iterate over each row
        for (const row of rows) {
            // Check if it's time to reset the questionsAnsweredToday field
            const lastReset = new Date(row.lastReset);
            const nextReset = new Date(
                lastReset.getTime() + 24 * 60 * 60 * 1000,
            );
            if (now >= nextReset) {
                // Reset the questionsAnsweredToday field and update the lastReset field
                db.run(
                    'UPDATE scores SET questionsAnsweredToday = 0, lastReset = ? WHERE userId = ?',
                    [now, row.userId],
                    (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    },
                );
            }
        }
    });
});

// Define the intents to use
const myIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildInvites,
];

// Creates a new Discord client
const client = new MyClient({
    intents: myIntents,
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.Channel,
        Partials.User,
        Partials.GuildMember,
    ],
});

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
