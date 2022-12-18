const fs = require('fs/promises');
const pdfParse = require('pdf-parse');

async function parsePdf() {
    const dataBuffer = await fs.readFile('./quest21.pdf');
    const parsedPdf = await pdfParse(dataBuffer);
    const text = parsedPdf.text;
    console.log(text);
}

exports.parsePdf = parsePdf;
