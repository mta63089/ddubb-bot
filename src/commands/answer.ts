// answer.ts
import { Message } from 'discord.js';
import { ScoreRow } from '../api/trivia';
import db from '../db/database';

const answer = {
    name: 'answer',
    description: 'Answer a trivia question!',
    execute: async (message: Message, args: string[]) => {
        // Get the user's answer from the arguments
        const userAnswer = args.join(' ');

        // Get the correct answer from the database
        db.get(
            'SELECT * FROM scores WHERE userId = ?',
            [message.author.id],
            (err, row: ScoreRow) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                if (row && row.currentQuestion) {
                    // Update the answeredQuestions field regardless of whether the answer is correct
                    db.run(
                        'UPDATE scores SET answeredQuestions = answeredQuestions + 1 WHERE userId = ?',
                        [message.author.id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        },
                    );

                    // Check if the user's answer is correct
                    if (
                        userAnswer.toLowerCase() ===
                        row.correctAnswer.toLowerCase()
                    ) {
                        // Update the user's score in the database
                        db.run(
                            'UPDATE scores SET score = score + 1, currentQuestion = NULL, correctAnswer = NULL WHERE userId = ?',
                            [message.author.id],
                            (err) => {
                                if (err) {
                                    console.error(err.message);
                                }
                            },
                        );

                        message.reply('Correct answer!');
                    } else {
                        message.reply(
                            `Wrong answer! The correct answer was: ${row.correctAnswer}`,
                        );
                    }
                } else {
                    message.reply('You have not started a trivia game yet!');
                }
            },
        );
    },
};

export default answer;
