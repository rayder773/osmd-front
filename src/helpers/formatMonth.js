import moment from 'moment';
export const formatMonth = (text) => {
    let result = text;
    if (typeof text === "string"){
        //Siquelize usualy returns dates as 2020-01-15T00:00:00.000Z
        result = text.replace(/T.+/,'');
    }
    return moment(text).format('MMMM');
}