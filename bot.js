// Require the discord library module
const Discord = require('discord.js');

// Creates a new Discord client
const client = new Discord.Client();

// Set up an event listener that runs when the client is ready
client.on('ready', () => {
  console.log('Ready!');
});

// Sets up another event listener that runs whenever a message is received.
client.on('message', message => {
    // log the message to the console
    console.log(message.content);
});

// login to discord with your app's token
client.login(process.env.DISCORD_APP_TOKEN);