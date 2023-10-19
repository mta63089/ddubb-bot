import { Message } from 'discord.js';

const help = {
    name: 'trivia-help',
    description: 'Display a help message with all the trivia-related commands',
    execute: async (message: Message) => {
        // Define the help message
        const helpMessage = `
- \`!trivia\`: Start a new trivia game
- \`!answer <answer>\`: Answer a trivia question
- \`!trivia-leaderboard\`: Display the server-wide trivia leaderboard
- \`!trivia-rules\`: Display the rules of the trivia game
- \`!trivia-status\`: Display your current points, questions remaining for the day, and time until question reset
        `;

        // Send the help message
        message.channel.send(`**Trivia Help:**\n${helpMessage}`);
    },
};

export default help;
