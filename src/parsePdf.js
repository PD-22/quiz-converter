const fs = require('fs/promises');
const { join } = require('path');
const pdfParse = require('pdf-parse');

const inputPath = join(__dirname, '../data/quiz.pdf');

async function parsePdf() {
    const dataBuffer = await fs.readFile(inputPath);

    const parsedPdf = await pdfParse(dataBuffer);
    const text = parsedPdf.text;

    console.log(text);
}

exports.parsePdf = parsePdf;
