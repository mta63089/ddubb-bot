import axios from 'axios';
import he from 'he';

export interface ScoreRow {
    userId: string;
    score: number;
    answeredQuestions: string;
    currentQuestion: string;
    correctAnswer: string;
    lastReset: Date;
    questionsAnsweredToday: number;
    answers: string[];
}

export async function fetchTriviaQuestion() {
    const response = await axios.get(
        'https://opentdb.com/api.php?amount=1&type=multiple',
    );
    const question = response.data.results[0];
    // Decode HTML entities in the question and answers
    question.question = he.decode(question.question);
    question.correct_answer = he.decode(question.correct_answer);
    question.incorrect_answers = question.incorrect_answers.map(
        (answer: string) => he.decode(answer),
    );

    question.question = `🎉🎉🎉 Here's your trivia question: ${question.question} 🎉🎉🎉`;

    // Combine correct and incorrect answers and shuffle them
    const answers = [question.correct_answer, ...question.incorrect_answers];
    question.answers = answers.sort(() => Math.random() - 0.5);

    return question;
}
