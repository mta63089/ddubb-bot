import { Database } from 'sqlite3';

const db = new Database('./trivia.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the trivia database.');
});

db.run(
    `CREATE TABLE IF NOT EXISTS scores (
  userId TEXT PRIMARY KEY,
  score INTEGER,
  answeredQuestions TEXT
)`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
    },
);

export default db;
