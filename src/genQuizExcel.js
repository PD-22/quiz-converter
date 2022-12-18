const excel = require('excel4node');
const { sortBy } = require('lodash');

/*
options example
{
    'ა': '21 დღე;',
    'ბ': '6 თვე;',
    'გ': '2 წელიწადი;',
    'დ': '9 თვე.'
};
*/

async function genQuizExcel(outputPath, quizList) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const defaultStyle = workbook.createStyle();
    const boldStyle = workbook.createStyle({ font: { bold: true } });

    let y = 1;

    quizList.forEach((quiz, i) => {
        const { number, question, answer, options } = quiz;

        const x = 1;

        worksheet.cell(y++, x).string(number).style(boldStyle);
        worksheet.cell(y++, x).string(question);

        const optionEntries = sortBy(Object.entries(options), ([key, val]) => key);

        optionEntries.forEach((optionEntry) => {
            const [letter, optionText] = optionEntry;

            const currentStyle = letter === answer ? boldStyle : defaultStyle;

            worksheet.cell(y, x).string(letter).style(currentStyle);
            worksheet.cell(y, x + 1).string(optionText);
            y++;
        });
        y++;
    });

    workbook.write(outputPath);
}

exports.genQuizExcel = genQuizExcel;
