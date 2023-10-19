import { Message } from 'discord.js';
import { ScoreRow } from '../api/trivia';
import db from '../db/database';

const answer = {
    name: 'answer',
    description: 'Answer a trivia question!',
    execute: async (message: Message, args: string[]) => {
        // Get the user's answer from the arguments
        const userAnswer = args[0]; // Expecting a single character (a, b, c, or d)

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
                    // Map the user's answer to an index
                    const answerIndex = ['a', 'b', 'c', 'd'].indexOf(
                        userAnswer.toLowerCase(),
                    );

                    // Check if the user's answer is correct
                    const isCorrect =
                        answerIndex !== -1 &&
                        row.answers[answerIndex] === row.correctAnswer;

                    // Update the user's score in the database
                    db.run(
                        'UPDATE scores SET score = score + ?, currentQuestion = NULL, correctAnswer = NULL, answers = NULL, questionsRemaining = questionsRemaining - 1 WHERE userId = ?',
                        [isCorrect ? 1 : 0, message.author.id],
                        (err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        },
                    );

                    if (isCorrect) {
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
