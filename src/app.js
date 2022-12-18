const { join } = require('path');
const { parseQuizPdf } = require("./parseQuizPdf");
const { formatQuiz } = require("./formatQuiz");
const { genQuizExcel } = require('./genQuizExcel');

const startPath = join(__dirname, '../test');

start(startPath);

async function start(startPath) {
    const inputPath = join(startPath, '/quiz.pdf');
    const quizText = await parseQuizPdf(inputPath);

    const quizObject = formatQuiz(quizText);
    console.log(quizObject);

    const outputPath = join(startPath, '/quiz.xlsx');
    const gridInput = [
        ['question1', 'answer1'],
        ['question2', 'answer2'],
        ['question2', 'answer2'],
    ];
    await genQuizExcel(outputPath, gridInput);
}
