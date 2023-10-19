import { Message } from 'discord.js';
import db from '../db/database';
import { fetchTriviaQuestion } from '../api/trivia';

const trivia = {
    name: 'trivia',
    description: 'Start a trivia game!',
    execute: async (message: Message) => {
        const question = await fetchTriviaQuestion();

        // Check if the user has already answered this question
        db.get(
            'SELECT * FROM scores WHERE userId = ? AND answeredQuestions LIKE ?',
            [message.author.id, `%${question.question}%`],
            (err, row) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                if (row) {
                    message.reply('You have already answered this question!');
                } else {
                    // Send the trivia question to the user
                    message.reply(question.question);
                }
            },
        );
    },
};

export default trivia;
