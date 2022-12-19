/*
output example
[
  {
    number: '21',
    question: 'საქართველოს კონსტიტუციით, რა არის ბრალდებულის წინასწარი პატიმრობის მაქსიმალური ვადა?',       
    options: [ 'ა. 21 დღე', 'ბ. 6 თვე', 'გ. 2 წელიწადი', 'დ. 9 თვე' ],
    answer: 'დ'
  }
]
*/
function formatQuiz(text) {
    const regex = /(\d+\..*?)\s*?((?:^\s*?[ა-ჰ]\.\s*?.*?)+?)\s*?(სწორი პასუხია:\s*?[ა-ჰ])\s/smg;
    const matchList = [...text.matchAll(regex)];

    return matchList.map((match) => {
        const questionPart = match[1].trim();
        const optionsPart = match[2].trim();
        const answerPart = match[3].trim();

        const { number, question } = formatQuestionPart(questionPart);
        const options = formatOptionsPart(optionsPart);
        const answer = formatAnswerPart(answerPart);

        return { number, question, options, answer };
    });
}

exports.formatQuiz = formatQuiz;

function formatQuestionPart(questionPart) {
    const questionMatch = questionPart.match(/(\d+)\.\s*(.*)/s);
    const number = questionMatch[1];
    const question = removeNewLines(questionMatch[2]);
    return { number, question };
}

// test second quiz
// remove ; and . endings
function formatOptionsPart(optionsPart) {
    // const optionParts = optionsPart.split('\n').map(x => x.trim()).filter(Boolean);
    const matches = [...optionsPart.matchAll(/^.*[ა-ჰ]\./mg)];
    const matchedIndexes = matches.map(x => x.index);

    const optionList = [];
    matchedIndexes.forEach((item, i) => {
        const prev = matchedIndexes[i - 1] ?? 0;
        const current = matchedIndexes[i];
        const segment = optionsPart.slice(prev, current);
        const result = removeNewLines(segment).trim().replace(/;$/g, '');
        if (result) optionList.push(result);
    });

    const optionEntries = optionList.map(option => {
        const optionMatch = option.match(/([ა-ჰ])\.\s*(.*)/s);
        const letter = optionMatch[1];
        const optionText = optionMatch[2];
        return [letter, optionText];
    });
    return Object.fromEntries(optionEntries);
}

function formatAnswerPart(answerPart) {
    const answerMatch = answerPart.match(/სწორი პასუხია:\s*?([ა-ჰ])/s);
    return removeNewLines(answerMatch[1].trim());
}

function removeNewLines(text) {
    return text.replace(/(\r\n|\n|\r)/gm, "");
}
