const excel = require('excel4node');

genExcel();

async function genExcel() {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.cell(1, 1).string('question');

    worksheet.cell(1, 2).string('answer');

    workbook.write('quest.xlsx');
}

exports.genExcel = genExcel;
