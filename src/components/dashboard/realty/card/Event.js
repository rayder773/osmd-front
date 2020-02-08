import React from 'react';
import {serviceTypes, SeviceImage, getMetersImage} from '../../../../dataModels/metersData';
import {formatCurrency, formatMonthYear} from "../../../../helpers";
import {
    REALTY_EVENT_TYPE_METERS,
    REALTY_EVENT_TYPE_BILLS,
    REALTY_EVENT_TYPE_PAYMENTS,
    REALTY_EVENT_TYPE_DEMANDS
} from '../../../../constants/realtyEventTypes';

const formatDate = date => {
    if (!date) {
        return "";
    }
    const parts = date.substr(0, 10).split("-");
    return `${parts[2]}.${parts[1]}.${parts[0].substr(2)}`;
};

const Event = props => {
    const {event, position, onClick} = props;

    let title = "";
    let content = "";
    let color = "";
    let statusText = "";
    switch (event.type) {
        case REALTY_EVENT_TYPE_DEMANDS:
            title = "Заявка № " + event.number;
            content = event.value;
            color = "red";
            break;
        case REALTY_EVENT_TYPE_PAYMENTS:
            title = "Оплата по счету № " + event.number;
            content = "Произведена оплата за коммунальные услуги на " + formatCurrency(event.value, "грн");
            color = "green";
            break;
        case REALTY_EVENT_TYPE_BILLS:
            title = "Счет № " + event.number;
            content = "Выставлен счет за коммунальные услуги на " + formatCurrency(event.value, "грн");
            color = "orange";
            break;
        case REALTY_EVENT_TYPE_METERS:
            title = 'Показания';
            content = (serviceTypes[event.service] && serviceTypes[event.service].name || event.service);
            statusText = parseInt(event.number) == 1 ? 'Состояние "Принято"' : parseInt(event.number) == 2 ? 'Состояние "Отклонено"' : '';
            // : '';
            color = 'red';
            break;
        default:
            break;
    }

    if (!event.type) {
        return (
            <div className="realty-card-event date">
                <div className={"realty-card-event-padding " + position}>
                    <div className={"realty-card-event-v-line " + position}></div>
                </div>
                <div className="realty-card-event-holder date">
                    <div className="realty-card-event-header">{formatMonthYear(event.dateOf)}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="realty-card-event">
            <div className={"realty-card-event-padding " + position}>
                <div className={"realty-card-event-date " + position}>{formatDate(event.dateOf)}</div>
                <div className={"realty-card-event-v-line " + position}></div>
                <div className={"realty-card-event-h-line " + position}></div>
                <div className={"realty-card-event-circle " + position}>
                    <div className={"realty-card-event-circle-color " + position}></div>
                </div>
            </div>
            <div className="realty-card-event-holder" onClick={() => onClick(event)}>
                <div className="realty-card-event-header">
                    {title}
                </div>
                <div className={"realty-card-event-content"}>
                    <div className={"realty-card-event-color-line" + " " + color}></div>
                    {content}
                </div>
                <div className={"realty-card-event-action"}>
                    <span className={"realty-card-event-status-text"}> {statusText} </span>
                    {event.service &&
                    <img className="realty-card-event-action-img" src={getMetersImage(parseInt(event.service)).url}
                         alt={event.service}/>}
                    {event.service && <SeviceImage type={event.service}/>}
                </div>
            </div>
        </div>
    );
};

export default Event;

/*
*
const mapDispatchToProps = {
    openModal,
};
export default connect(null, mapDispatchToProps)(Event);
* */