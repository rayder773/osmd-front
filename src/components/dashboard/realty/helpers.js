import {formatCurrency} from "../../../helpers";
import {REALTY_EVENT_TYPE_ALL} from "../../../constants/realtyEventTypes";
import moment from "moment";

export const formatPhone = text => {
    if (!text) {
        return '';
    }
    const match = text
        .replace(/\D+/g, '')
        .replace(/^1/, '')
        .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part0 = match.length > 2 ? `+3` : match;
    const part1 = match.length > 2 ? ` ${match.substring(0, 3)}` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : '';
    const part3 = match.length > 6 ? ` ${match.substring(6, 8)}` : '';
    const part4 = match.length > 6 ? ` ${match.substring(8, 10)}` : '';
    return `${part0}${part1}${part2}${part3}${part4}`;
};

export const formatBorrow = text => {
    let result = formatCurrency(text, 'грн');
    if (parseFloat(text) > 0) {
        result = `-${result}`;
    }
    return result;
};

export const filterEvents = (type, dates) => event => {
    const result = type === REALTY_EVENT_TYPE_ALL || type === event.type;
    if (!result) {
        return false;
    }
    const {from, to} = dates;
    if (from && moment(event.dateOf).toDate() < moment(from).toDate()) {
        return false;
    }
    if (to && moment(event.dateOf).toDate() > moment(to).toDate()) {
        return false;
    }
    return true;
};