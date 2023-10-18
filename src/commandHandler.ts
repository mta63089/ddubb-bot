import fs from 'fs';
import { Client, ClientOptions, Collection, Message } from 'discord.js';

// Define the Command type
interface Command {
    name: string;
    description: string;
    execute: (message: Message, args?: string[]) => void;
}

// Extend the Client class to add the commands property
export class MyClient extends Client {
    commands: Collection<string, Command>;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}

export function handleCommands(client: MyClient) {
    // Create a new collection for the commands
    client.commands = new Collection();

    // Read the command files
    const commandFiles = fs
        .readdirSync('./src/commands')
        .filter((file) => file.endsWith('.ts'));

    // Import the commands
    for (const file of commandFiles) {
        const command: Command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    // Listen for messages
    client.on('messageCreate', (message: Message) => {
        // only accept commands that start with `!` and are not from the bot itself
        if (!message.content.startsWith('!') || message.author.bot) return;

        const args = message.content.slice('!'.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();

        // If the command doesn't exist exit block
        if (!command || !client.commands.has(command)) return;

        // execute the command and catch any errors and print them in the chat while logging them to console
        try {
            client.commands.get(command)?.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    });
}
