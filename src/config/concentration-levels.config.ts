interface ConcentrationLevelInfo {
    text: string;
    emoji: string;
}

const concentrationLevelsConfig: { [key: number]: ConcentrationLevelInfo } = {
    0: {
        text: 'Без фокусу',
        emoji: '💤'
    },
    1: {
        text: 'Розсіяний',
        emoji: '🤯'
    },
    2: {
        text: 'Ледь помітно',
        emoji: '😵'
    },
    3: {
        text: 'Трохи краще',
        emoji: '😐'
    },
    4: {
        text: 'Можна працювати',
        emoji: '🤔'
    },
    5: {
        text: 'Половина справи',
        emoji: '😌'
    },
    6: {
        text: 'Під контролем',
        emoji: '🙂'
    },
    7: {
        text: 'Добре',
        emoji: '😊'
    },
    8: {
        text: 'Це гарно',
        emoji: '😎'
    },
    9: {
        text: 'Майже досконало',
        emoji: '🤩'
    },
    10: {
        text: 'Максимум',
        emoji: '🧠'
    }
};

export default concentrationLevelsConfig;