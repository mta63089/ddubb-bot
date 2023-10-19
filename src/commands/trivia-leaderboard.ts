import { Message } from 'discord.js';
import { ScoreRow } from '../api/trivia';
import db from '../db/database';

const leaderboard = {
    name: 'trivia-leaderboard',
    description: 'Display the server-wide trivia leaderboard',
    execute: async (message: Message) => {
        // Fetch the leaderboard from the database
        db.all(
            'SELECT * FROM scores ORDER BY score DESC LIMIT 10',
            (err, rows: ScoreRow[]) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                // Format the leaderboard
                const leaderboard = rows
                    .map(
                        (row: ScoreRow, index) =>
                            `${index + 1}. <@${row.userId}>: ${
                                row.score
                            } points`,
                    )
                    .join('\n');

                // Send the leaderboard
                message.channel.send(`**Trivia Leaderboard:**\n${leaderboard}`);
            },
        );
    },
};

export default leaderboard;
