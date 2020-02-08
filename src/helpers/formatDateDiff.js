export const formatDateDiff = (date1 , date2) => {
    let result = '';
    if (! (date1 instanceof Date) || ! (date2 instanceof Date)) {
        return '';
    }

    result = (date1 - date2) / 1000 / 60;
    if (result < 0){
        result *= -1;
    }
    if (result < 60){
        return Math.round(result) + ' минут';
    }
    result /= 60;
    if (result < 60){
        return Math.round(result) + ' часов';
    }
    result /= 24;
    return Math.round(result) + ' дней';
}