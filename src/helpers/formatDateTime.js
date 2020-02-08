import moment from 'moment';
export const formatDateTime = (text) => {
    let result = text;
    //Siquelize usualy returns dates as 2020-01-15T00:00:00.000Z
    if (typeof text === "string" && text.indexOf('.000Z') > 0){
        text = text.split(/[T ]/);
        result = text[0].split("-").reverse().join(".") + ' ' + text[1].replace(".000Z",'');
    } else {
        return moment(text).format('DD.MM.YYYY hh:mm:ss')
    }
    return result;
}