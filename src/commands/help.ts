import { Message } from 'discord.js';
import { MyClient } from '../handlers/commandHandler';

export default {
    name: 'help',
    description: 'List all available commands.',
    execute(message: Message, args: string[], client: MyClient) {
        let reply = 'Here are all the available commands:\n';
        client.commands.forEach((command) => {
            reply += `\n**!${command.name}**: ${command.description}\n`;
        });
        message.channel.send(reply);
    },
};
