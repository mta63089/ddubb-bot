import axios from 'axios';

export interface ScoreRow {
    userId: string;
    score: number;
    answeredQuestions: string;
    currentQuestion: string;
    correctAnswer: string;
    lastReset: Date;
    questionsAnsweredToday: number;
}

export async function fetchTriviaQuestion() {
    const response = await axios.get('https://opentdb.com/api.php?amount=1');
    const question = response.data.results[0];
    return question;
}
