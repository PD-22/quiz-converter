function formatQuiz(text) {
    const textClean = removeNewLines(text)
    const questIndexList = [...textClean.matchAll(/\b\d+\./g)].map(x => x.index);
    const questList = trimList(splitAtIndex(textClean, questIndexList));

    return questList.map(quest => {
        const optionsIndex = quest.search(/\s[ა-ჰ]\./);
        const answerIndex = quest.search(/\sსწორი პასუხია:/);
        const splitParts = trimList(splitAtIndex(quest, [optionsIndex, answerIndex]));
        const [questPart, optionsPart, answerPart] = splitParts;

        const { number, question } = formatQuestionPart(questPart);
        const options = formatOptionsPart(optionsPart);
        const answer = formatAnswerPart(answerPart);

        return { number, question, options, answer };
    });
}

exports.formatQuiz = formatQuiz;

function formatQuestionPart(questionPart) {
    const [number, question] = trimList(splitAtFirstDot(questionPart));
    return { number, question };
}

function formatOptionsPart(optionsPart) {
    const optionIndexList = [...optionsPart.matchAll(/\s[ა-ჰ]\./g)].map(x => x.index);

    const optionList = trimList(
        splitAtIndex(optionsPart, optionIndexList)
    ).map(
        x => x.replace(/[;,.]$/g, '')
    );

    const optionEntries = optionList.map(option => trimList(splitAtFirstDot(option)));
    return Object.fromEntries(optionEntries);
}

function formatAnswerPart(answerPart) {
    return splitAtFirstColon(answerPart)[1].trim();
}

// #region helpers
function trimList(str) { return str.map(x => x.trim()).filter(x => x !== ''); }

function splitAtFirstDot(text) { return splitAtFirst(text, /\./); }
function splitAtFirstColon(text) { return splitAtFirst(text, /:/); }
function splitAtFirst(text, regex) {
    const index = text.search(regex);
    const first = text.slice(0, index);
    const second = text.slice(index + 1);
    return [first, second];
}

function splitAtIndex(text, indexList) {
    const result = [];
    for (let i = -1; i < indexList.length; i++) {
        const start = indexList[i] ?? 0;
        const end = indexList[i + 1] ?? text.length;
        const segment = text.slice(start, end);
        if (result) result.push(segment);
    }
    return result;
}

function removeNewLines(text) { return text.replace(/(\r\n|\n|\r)/gm, ""); }
// #endregion
