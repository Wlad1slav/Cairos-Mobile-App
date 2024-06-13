/**
 * return: Current day of the week
 */
const getWeekDay = () => {
    const lastDayOfWeek = 7;
    let weekDay = -1;
    const todayDate = new Date();

    if (todayDate.getDay() === 0) weekDay = lastDayOfWeek;
    else weekDay = todayDate.getDay();

    return weekDay;
}

export default getWeekDay;