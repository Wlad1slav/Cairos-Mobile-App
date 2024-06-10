import {replaceStringPlaceholders} from "../../utils/lang";

const placeholders: { [key: string]: string } = {
    untilEndOfWeek: '%s %s until the end of the week',
}

const localization: { [key: string]: any } = {
    dayLocByNumber: {
        1: 'days',
        2: 'days',
        3: 'days',
        4: 'days',
        5: 'days',
        6: 'days',
        7: 'days',
    },
    daysOfWeek: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday',
    },
    untilEndOfWeek: (todayNumber: number) => {
        const lastDayOfWeek = 7;
        const daysUntilEndOfWeek = lastDayOfWeek + 1 - todayNumber;
        const localizationOfTheDay = localization.dayLocByNumber[daysUntilEndOfWeek as keyof typeof localization.dayLocByNumber];
        return replaceStringPlaceholders(placeholders.untilEndOfWeek, daysUntilEndOfWeek.toString(), localizationOfTheDay);
    },
}

export default localization;