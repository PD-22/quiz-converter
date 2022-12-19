const fs = require('fs/promises');
const pdfParse = require('pdf-parse');

async function parseQuizPdf(inputPath) {
    const dataBuffer = await fs.readFile(inputPath);
    const parsedPdf = await pdfParse(dataBuffer);
    return parsedPdf.text;
}

exports.parseQuizPdf = parseQuizPdf;
