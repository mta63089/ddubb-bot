import { Message } from 'discord.js';

const ping = {
    name: 'ping',
    description: 'Ping!',
    execute: async (message: Message) => {
        message.channel.send('Pong!');
    },
};

export default ping;
