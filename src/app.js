const { join } = require('path');
const { parsePdf } = require("./parsePdf");
const { formatQuiz } = require("./formatQuiz");
const { genExcel } = require('./genExcel');

const startPath = join(__dirname, '../test');

start(startPath);

async function start(startPath) {
    const inputPath = join(startPath, '/quiz.pdf');
    const quizText = await parsePdf(inputPath);

    const quizObject = formatQuiz(quizText);
    console.log(quizObject);

    const outputPath = join(startPath, '/quiz.xlsx');
    const gridInput = [
        ['question1', 'answer1'],
        ['question2', 'answer2'],
        ['question2', 'answer2'],
    ];
    await genExcel(outputPath, gridInput);
}
