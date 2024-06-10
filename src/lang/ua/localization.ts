import {replaceStringPlaceholders} from "../../utils/lang";

const placeholders: { [key: string]: string } = {
    untilEndOfWeek: '%s %s до кінця тижня',
}

const localization: { [key: string]: any } = {
    dayLocByNumber: {
        1: 'день',
        2: 'дня',
        3: 'дня',
        4: 'дня',
        5: 'днів',
        6: 'днів',
        7: 'днів',
    },
    daysOfWeek: {
        1: 'Понеділок',
        2: 'Вівторок',
        3: 'Середа',
        4: 'Четвер',
        5: 'П\'ятниця',
        6: 'Субота',
        7: 'Неділя',
    },
    untilEndOfWeek: (todayNumber: number) => {
        const lastDayOfWeek = 7;
        const daysUntilEndOfWeek = lastDayOfWeek + 1 - todayNumber;
        const localizationOfTheDay = localization.dayLocByNumber[daysUntilEndOfWeek as keyof typeof localization.dayLocByNumber];
        return replaceStringPlaceholders(placeholders.untilEndOfWeek, daysUntilEndOfWeek.toString(), localizationOfTheDay);
    },
}

export default localization;