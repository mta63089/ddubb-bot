import { Client, GuildMember, TextChannel } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to handle welcome messages and role assignment on reaction
export async function handleWelcome(client: Client) {
    // Event listener for when a new member joins the server
    client.on('guildMemberAdd', (member: GuildMember) => {
        // Define the emotes to be used in the welcome message
        const emotes = [
            '<a:happykitty:1164238270952128623>',
            '<a:nessie:1164238284122235042>',
            '<a:happyclappingcat:1164238246268653628>',
            '<a:hibubble:1164238233186603062>',
            '<a:pikachuhearts:1164238218410078359>',
            '<a:squidwarddance:1164238277524598865>',
        ];

        // Define the welcome messages
        const messages = [
            `Welcome to the server, ${member.user.username}! ${
                emotes[Math.floor(Math.random() * emotes.length)]
            } Please go to the <#${
                process.env.RULES_AND_TERMS_CHANNEL_ID
            }> and react to the post to gain access to the rest of the server.`,
            `Hello, ${member.user.username}! We're glad you're here. ${
                emotes[Math.floor(Math.random() * emotes.length)]
            } Check the <#${
                process.env.RULES_AND_TERMS_CHANNEL_ID
            }> channel and react to the post to see the rest of the channels.`,
            `Hi ${member.user.username}! Welcome aboard. ${
                emotes[Math.floor(Math.random() * emotes.length)]
            } Don't forget to visit the <#${
                process.env.RULES_AND_TERMS_CHANNEL_ID
            }> channel and react to the post to gain access to the rest of the server.`,
        ];

        // Choose a random welcome message
        const message = messages[Math.floor(Math.random() * messages.length)];

        // Get the welcome channel using the ID from the environment variables
        const channel = member.guild.channels.cache.get(
            process.env.WELCOME_CHANNEL_ID!,
        );

        // Check if the channel is a text channel and send the welcome message
        if (channel) {
            (channel as TextChannel).send(message);
        } else {
            console.error('Welcome channel not found');
        }
    });

    // Event listener for when a reaction is added to a message
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error(
                    'Something went wrong when fetching the reaction: ',
                    error,
                );
                return;
            }
        }

        if (reaction.emoji.name !== '✋') {
            console.log('Incorrect emoji, exiting block');
            return;
        }

        // Check if the reaction is in the rules-and-terms channel
        if (
            reaction.message.channel.id !==
            process.env.RULES_AND_TERMS_CHANNEL_ID
        ) {
            console.log('reaction not in correct channel, exiting block');
            return;
        }

        // Check if the reaction is to the rules and terms message
        if (reaction.message.id !== process.env.RULES_AND_TERMS_POST_ID) {
            console.log('reaction not in correct message, exiting block');
            return;
        }

        // Fetch the user if it's a partial
        if (user.partial) {
            try {
                await user.fetch();
            } catch (error) {
                console.error(
                    'Something went wrong when fetching the user: ',
                    error,
                );
                return;
            }
        }

        // Get the member who reacted
        const member = reaction.message.guild?.members.cache.get(user.id);

        // Find the role to be assigned
        const role = reaction.message.guild?.roles.cache.find(
            (role) => role.name === 'standard',
        );

        // Check if the role and member exist and assign the role
        if (role && member) {
            try {
                await member.roles.add(role);
                `successfully assigned the role of ${role.name} to ${user}`;
            } catch (error) {
                console.error(
                    'Something went wrong when adding the role: ',
                    error,
                );
            }
        } else {
            console.error('Role or member not found');
        }
    });
}
