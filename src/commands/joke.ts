import { Message } from 'discord.js';
import axios from 'axios';

export interface Joke {
    error: boolean;
    category: string;
    type: string;
    joke?: string;
    setup?: string;
    delivery?: string;
    flags: {
        [key: string]: boolean;
    };
    id: number;
    safe: boolean;
    lang: string;
}

export default {
    name: 'joke',
    description: 'Get a random joke.',
    async execute(message: Message, args: string[]) {
        try {
            // Use axios to fetch a random joke from the JokeAPI
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
            const data = response.data as Joke;
            if (!data) return;
            // Check if the joke is a single-part joke or a two-part joke
            const joke =
                data.type === 'single'
                    ? data.joke
                    : `${data.setup} ${data.delivery}`;
            // Send the joke to the channel
            if (joke) {
                message.channel.send(joke);
            } else {
                console.error('Joke not found');
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            message.reply('There was an error trying to fetch a joke!');
        }
    },
};
