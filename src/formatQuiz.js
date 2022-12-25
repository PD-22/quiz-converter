function formatQuiz(text) {
    const textClean = text.replace(/(\r\n|\n|\r)/g, "");

    const quizRegex = /\b(\d+)\.\s*(.*?)\s*?(\s[ა-ჰ]\..*?)\s*სწორი პასუხია:\s*([ა-ჰ])/g;
    const quizMatches = Array.from(textClean.matchAll(quizRegex));

    return quizMatches.map(match => {
        const { 1: number, 2: question, 3: optionsPart, 4: answer } = match;
        const options = parseOptions(optionsPart);
        return { number, question, options, answer };
    });
}

exports.formatQuiz = formatQuiz;

function parseOptions(optionsPart) {
    const optionMatches = Array.from(optionsPart.matchAll(/\s[ა-ჰ]\./g));
    const optionIndices = optionMatches.map(x => x.index);

    const optionList = splitAtIndices(optionsPart, optionIndices)
        .map(x => x.trim())
        .map(x => x.replace(/[;,.]$/g, ''));

    const optionEntries = optionList.map(x => {
        const optionMatch = x.match(/([ა-ჰ])\.\s*(.*)/);
        const { 1: letter, 2: text } = optionMatch;
        return [letter, text];
    });
    return Object.fromEntries(optionEntries);
}

function splitAtIndices(text, indexList) {
    const result = [];
    for (let i = -1; i < indexList.length; i++) {
        const start = indexList[i] ?? 0;
        const end = indexList[i + 1] ?? text.length;
        if (start === end) continue;
        const segment = text.slice(start, end);
        result.push(segment);
    }
    return result;
}
