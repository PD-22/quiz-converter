const excel = require('excel4node');

/*
gridInput example
[
    ['question1', 'answer1'],
    ['question2', 'answer2'],
    ['question2', 'answer2'],
];
*/
async function genExcel(outputPath, gridInput) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    gridInput.forEach((row, i) => {
        row.forEach((text, j) => {
            const [y, x] = [i + 1, j + 1];
            worksheet.cell(y, x).string(text);
        })
    });

    workbook.write(outputPath);
}

exports.genExcel = genExcel;
