// Import necessary modules from discord.js and fs
import fs from 'fs';
import { Client, ClientOptions, Collection, Message } from 'discord.js';

// Define the Command interface
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
        // Initialize the commands collection
        this.commands = new Collection();
    }
}

// Export the handleCommands function
export async function handleCommands(client: MyClient) {
    // Read the command files
    const commandFiles = fs
        .readdirSync('./src/commands')
        .filter((file) => file.endsWith('.ts'));

    // Import the commands
    for (const file of commandFiles) {
        // Use dynamic import to import the command
        const commandModule = await import(`../commands/${file}`);

        // Extract the command from the module
        const command: Command = commandModule.default;

        // Add the command to the commands collection
        client.commands.set(command.name, command);
    }

    // Listen for messages
    client.on('messageCreate', (message: Message) => {
        // Ignore messages that do not start with '!' or are from bots
        if (!message.content.startsWith('!') || message.author.bot) return;

        // Extract the command and arguments from the message
        const args = message.content.slice('!'.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        // Ignore messages that do not correspond to a command
        if (!commandName || !client.commands.has(commandName)) return;

        // Execute the command
        try {
            const command = client.commands.get(commandName);
            command?.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    });
}
