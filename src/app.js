const { join } = require('path');
const { parseQuizPdf } = require("./parseQuizPdf");
const { formatQuiz } = require("./formatQuiz");
const { genQuizExcel } = require('./genQuizExcel');

start();

async function start() {
    const inputPath = join(__dirname, '/test/quiz.pdf');
    const quizText = await parseQuizPdf(inputPath);
    const quizFormatted = formatQuiz(quizText);
    const outputPath = join(__dirname, '/test/quiz.xlsx');
    await genQuizExcel(outputPath, quizFormatted);
}
