const { join } = require('path');
const { parseQuizPdf } = require("./parseQuizPdf");
const { formatQuiz } = require("./formatQuiz");
const { genQuizExcel } = require('./genQuizExcel');

const startPath = join(__dirname, '../test');

start(startPath);

async function start(startPath) {
    const inputPath = join(startPath, '/quiz.pdf');
    const quizText = await parseQuizPdf(inputPath);

    const quizList = formatQuiz(quizText);

    const outputPath = join(startPath, '/quiz.xlsx');
    await genQuizExcel(outputPath, quizList);
}
