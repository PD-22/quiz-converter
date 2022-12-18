const fs = require('fs/promises');
const pdfParse = require('pdf-parse');

async function parsePdf(inputPath) {
    const dataBuffer = await fs.readFile(inputPath);

    const parsedPdf = await pdfParse(dataBuffer);
    const text = parsedPdf.text;

    return text;
}

exports.parsePdf = parsePdf;
