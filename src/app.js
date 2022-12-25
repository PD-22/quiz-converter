const { join } = require('path');
const { parseQuizPdf } = require("./parseQuizPdf");
const { formatQuiz } = require("./formatQuiz");
const { genQuizExcel } = require('./genQuizExcel');
const { writeFile } = require('fs/promises');

const inputPath = join(__dirname, '../test/quiz.pdf');
const jsonOutputPath = join(__dirname, '../test/quiz.json');
const excelOutputPath = join(__dirname, '../test/quiz.xlsx');

start();

async function start() {
    const quizText = await parseQuizPdf(inputPath);
    const quizFormatted = formatQuiz(quizText);
    await writeFile(jsonOutputPath, JSON.stringify(quizFormatted, null, 2));
    await genQuizExcel(excelOutputPath, quizFormatted);
}
