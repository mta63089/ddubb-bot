// src/commands/trivia-status.ts

import { Message } from 'discord.js';
import db from '../db/database';
import { ScoreRow } from '../api/trivia';

const status = {
    name: 'trivia-status',
    description: 'Display your trivia status',
    execute: async (message: Message) => {
        // Fetch the player's status from the database
        db.get(
            'SELECT * FROM scores WHERE userId = ?',
            [message.author.id],
            (err, row: ScoreRow) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                if (row) {
                    // Calculate the percentage of questions answered correctly
                    const percentageCorrect =
                        (row.score / (row.answeredQuestions.length || 0)) * 100;

                    // Calculate the time until the next reset
                    const now = new Date();
                    const nextReset = new Date(
                        row.lastReset.getTime() + 24 * 60 * 60 * 1000,
                    );
                    const timeUntilReset = Math.max(
                        0,
                        (nextReset.getTime() - now.getTime()) /
                            (60 * 60 * 1000),
                    );

                    // Format the status
                    const status = `
                        Points: ${row.score}
                        Questions Remaining for the Day: ${
                            2 - row.questionsAnsweredToday
                        }
                        Time Until Question Reset: ${timeUntilReset.toFixed(
                            2,
                        )} hours
                        Percentage of Questions Answered Correctly: ${percentageCorrect.toFixed(
                            2,
                        )}%
                        `;

                    // Send the status
                    message.reply(`**Your Trivia Status:**\n${status}`);
                } else {
                    message.reply('You have not started a trivia game yet!');
                }
            },
        );
    },
};

export default status;
