// Require the discord library module
const Discord = require('discord.js');

// Define the intents to use
const myIntents = new Discord.Intents();
myIntents.add(Discord.Intents.FLAGS.Guilds, Discord.Intents.FLAGS.GuildMessages);

// Creates a new Discord client
const client = new Discord.Client({intents: myIntents});

// Set up an event listener that runs when the client is ready
client.on('ready', () => {
  console.log('Ready!');
});

// Sets up another event listener that runs whenever a message is received.
client.on('messageCreate', message => {
    // log the message to the console
    console.log(message.content);
});

// login to discord with your app's token
client.login(process.env.DISCORD_APP_TOKEN);