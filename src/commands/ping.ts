import { Message } from 'discord.js';

export const name = 'ping';
export const description = 'Ping!';

export const execute = async (message: Message) => {
    message.channel.send('Pong!');
};
