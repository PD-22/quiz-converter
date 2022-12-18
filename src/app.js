const { join } = require('path');
const { parsePdf } = require("./parsePdf");
const { genExcel } = require('./genExcel');

start();

async function start() {
    const inputPath = join(__dirname, '../data/quiz.pdf');
    const text = await parsePdf(inputPath);
    console.log(text);

    const outputPath = join(__dirname, '../data/quiz.xlsx');
    const gridInput = [
        ['question1', 'answer1'],
        ['question2', 'answer2'],
        ['question2', 'answer2'],
    ];
    await genExcel(outputPath, gridInput);
}
