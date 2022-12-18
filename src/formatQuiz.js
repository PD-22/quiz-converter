function formatQuiz(text) {
    const regex = /(\d+\.\s*?.+?)\s*?(([აბგდ]\..+?)+?)(სწორი პასუხია:\s*?[აბგდ])/sg;
    const matchList = [...text.matchAll(regex)];

    return matchList.map((match) => {
        const questionPart = match[1];
        const optionsPart = match[2];
        const answerPart = match[4];

        const { number, question } = formatQuestionPart(questionPart);
        const options = formatOptionsPart(optionsPart);
        const answer = formatAnswerPart(answerPart);

        return { number, question, options, answer };
    });
}

exports.formatQuiz = formatQuiz;

function formatOptionsPart(optionsPart) {
    return optionsPart.split('\n').map(x => x.trim()).filter(Boolean);
}

function formatQuestionPart(questionPart) {
    const questionMatch = questionPart.match(/(\d+)\.\s*(.*)/s);
    const number = questionMatch[1];
    const question = questionMatch[2].replace(/(\r\n|\n|\r)/gm, "");
    return { number, question };
}

function formatAnswerPart(answerPart) {
    const answerMatch = answerPart.match(/სწორი პასუხია:\s*?([აბგდ])/s);
    const answer = answerMatch[1];
    return answer;
}
