const excel = require('excel4node');
const { join } = require('path');

const outputPath = join(__dirname, '../data/quiz.xlsx');

async function genExcel() {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.cell(1, 1).string('question');
    worksheet.cell(1, 2).string('answer');

    workbook.write(outputPath);
}

exports.genExcel = genExcel;
