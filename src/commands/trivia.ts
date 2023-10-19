import { Message } from 'discord.js';
import db from '../db/database';
import { fetchTriviaQuestion } from '../api/trivia';

const trivia = {
    name: 'trivia',
    description: 'Start a trivia game!',
    execute: async (message: Message) => {
        const question = await fetchTriviaQuestion();

        // Store the trivia question in the database
        db.run(
            'INSERT OR REPLACE INTO scores (userId, currentQuestion, correctAnswer) VALUES (?, ?, ?)',
            [message.author.id, question.question, question.correct_answer],
            (err) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                // Send the trivia question to the user
                message.reply(question.question);
                message.reply(
                    'Send your answer by typing !answer _answer here_',
                );
            },
        );
    },
};

export default trivia;
