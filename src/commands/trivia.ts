import { Message } from 'discord.js';
import db from '../db/database';
import { ScoreRow, fetchTriviaQuestion } from '../api/trivia';

const trivia = {
    name: 'trivia',
    description: 'Start a trivia game!',
    execute: async (message: Message) => {
        // Check if the user has already answered 2 questions today
        db.get(
            'SELECT answeredQuestions FROM scores WHERE userId = ?',
            [message.author.id],
            async (err, row: ScoreRow) => {
                if (err) {
                    console.error(err.message);
                    return;
                }

                if (row && row.questionsAnsweredToday >= 2) {
                    // The user has already answered 2 questions today
                    message.reply(
                        'You have already answered 2 questions today. Please wait until tomorrow to play again.',
                    );
                    return;
                }

                // The user can answer a question
                // Fetch the trivia question
                const question = await fetchTriviaQuestion();

                // Assume the question object includes a field 'answers' that is an array of strings
                const answers = question.answers.map(
                    (answer: any, index: any) => {
                        // Map the index to a letter
                        const letter = String.fromCharCode(
                            97 + index,
                        ).toUpperCase();

                        return `${letter}. ${answer}`;
                    },
                );

                // Format the answers string
                const answersString = `${answers[0]}\t${answers[1]}\n${answers[2]}\t${answers[3]}`;

                // Find the index of the correct answer
                const correctAnswerIndex = question.answers.indexOf(
                    question.correct_answer,
                );

                // Store the trivia question and answers in the database
                db.run(
                    'INSERT OR REPLACE INTO scores (userId, currentQuestion, correctAnswer, answeredQuestions, answers) VALUES (?, ?, ?, COALESCE((SELECT answeredQuestions FROM scores WHERE userId = ?), 0) + 1, ?)',
                    [
                        message.author.id,
                        question.question,
                        correctAnswerIndex, // Store the correct answer as an index
                        message.author.id,
                        JSON.stringify(question.answers), // Store the answers as a JSON string
                    ],
                    (err) => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }

                        // Send the trivia question and answers to the user
                        message.reply(question.question);
                        message.reply(answersString);
                        message.reply(
                            'Type !answer a, !answer b, !answer c, or !answer d to lock in your choice',
                        );
                    },
                );
            },
        );
    },
};

export default trivia;
