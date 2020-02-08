import moment from 'moment';
export const formatDate = (text) => {
    let result = text;
    if (typeof text === "string"){
        //Siquelize usualy returns dates as 2020-01-15T00:00:00.000Z
        result = text.replace(/T.+/,'').split("-").reverse().join(".");
    } else if (text instanceof Date) {
        moment(text).format('DD.MM.YYYY')
    }
    return result;
}