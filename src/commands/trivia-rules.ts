import { Message } from 'discord.js';

const rules = {
    name: 'trivia-rules',
    description: 'Display the rules of the trivia game',
    execute: async (message: Message) => {
        // Define the rules
        const rules = `
1. Each player can answer up to two questions per day.
2. Correct answers earn one point.
3. The player with the most points at the end of the month wins.
        `;

        // Send the rules
        message.channel.send(`**Trivia Rules:**\n${rules}`);
    },
};

export default rules;
