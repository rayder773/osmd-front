/* eslint-disable no-nested-ternary */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Card, Col, Divider, Modal, Radio, Row, Spin} from 'antd';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import {
    getRealtyCardData,
    saveBillForRealtyCard,
} from '../../../../store/actions/realtyCard';
import {serviceTypes, SeviceImage} from '../../../../dataModels/metersData';
import {filterEvents, formatBorrow, formatPhone,} from '../helpers'
import './styles.scss';

import headerBg from '../../../../assets/images/realty-card-header-bg.svg';
import Event from './Event';
import BillTemplate from './billTemplate';
import DateFilter from '../../../widget/dateFilter';
import {
    REALTY_EVENT_TYPE_ALL,
    REALTY_EVENT_TYPE_BILLS,
    REALTY_EVENT_TYPE_DEMANDS,
    REALTY_EVENT_TYPE_METERS,
    REALTY_EVENT_TYPE_PAYMENTS,
} from '../../../../constants/realtyEventTypes';
import billStatusTypes from "../../../../constants/billStatusTypes";
import {getModalReviewData} from '../../../../store/actions/modalReview';
import {getBillTemplate} from '../../../../store/actions/billTemplate'

const renderEvents = (events, openModal) => {
    if (!events || events.length === 0) {
        return <div className="realty-card-event-message">Нет событий для текущего объекта</div>;
    }
    events = events.splice(0);
    events.unshift({dateOf: events[0].dateOf});
    for (let i = 0; i < events.length; i++) {
        if (i == events.length - 1) {
            break;
        }
        if (events[i].dateOf.substr(0, 7) != events[i + 1].dateOf.substr(0, 7) && events[i].type) {
            events.splice(i + 1, 0, {dateOf: events[i + 1].dateOf});
            i++;
        }
    }

    return events.map((event, idx) => (
        <div key={event.type + event.id || event.dateOf}>
            <Event
                onClick={openModal}
                event={event}
                position={
                    idx === 0
                        ? 'zero'
                        : idx === 1 && idx === events.length - 1
                        ? 'single'
                        : idx === 1
                            ? 'first'
                            : idx === events.length - 1
                                ? 'last'
                                : ''
                }
            />
        </div>
    ));
};

const RealtyCard = props => {
    const {
        cardData,
        realtyId,
        isFetching,
        isDataProcessing,
        billData,
        saveBillForRealtyCard,
        getRealtyCardData,
        getBillTemplate
    } = props;
    const [cardEventFilter, setCardFilter] = useState(REALTY_EVENT_TYPE_ALL);
    const [cardEventDates, setCardDates] = useState({from: null, to: null});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getRealtyCardData(realtyId);
    }, []);
    console.log('got realty card data', cardData, isFetching);

    const onChangeItemsType = event => {
        setCardFilter(event.target.value);
    };
    const onChangeDateFilter = filter => {
        setCardDates(filter);
    };

    const onDraftBillTemplate = () => {
        getBillTemplate(realtyId, billStatusTypes.DRAFT);
        setIsVisible(true);
    };

    const onReadyBillTemplate = e => {
        getBillTemplate(e.id, billStatusTypes.READY);
        setIsVisible(true);
    };

    const onBillSave = bill => saveBillForRealtyCard(bill);

    const onCloseBillTemplate = e => setIsVisible(false);


    return (
        <div className={`realty-card ${isFetching ? 'loading' : ''}`}>
            <Breadcrumb style={{margin: '0 0 16px'}}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                <Breadcrumb.Item>г. Одесса</Breadcrumb.Item>
                <Breadcrumb.Item>{realtyId}</Breadcrumb.Item>
            </Breadcrumb>
            {(isFetching || isDataProcessing) && (
                <div className="realty-card-loader ">
                    <div>
                        <Spin/>
                    </div>
                </div>
            )}
            {!isFetching && (
                <Row>
                    <Col span={8} className="realty-card-info">
                        <Card className="realty-card-info">
                            <div className="realty-card-header">
                                {`Кв. ${cardData.appartment_number || ''}`} <img src={headerBg}/>
                            </div>
                            <Divider/>
                            <p className="realty-card-info-label">Адрес</p>
                            <p className="realty-card-info-value">
                                {`г. Одесса${(cardData.building &&
                                    `, ул. ${cardData.building.street_name} ${cardData.building.number}`) ||
                                ''}`}
                            </p>
                            <Row>
                                <Col span={10} className="realty-card-info-label">
                                    Тип
                                </Col>
                                <Col span={8} className="realty-card-info-label">
                                    Площадь
                                </Col>
                                <Col span={6} className="realty-card-info-label">
                                    Комнат
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10} className="realty-card-info-value">
                                    {cardData.appartment_type && cardData.appartment_type.name}
                                </Col>
                                <Col span={8} className="realty-card-info-value">
                                    {cardData.square || ''}
                                </Col>
                                <Col span={6} className="realty-card-info-value">
                                    {cardData.room_count || ''}
                                </Col>
                            </Row>
                            <Divider/>
                            {cardData.appartments_payers &&
                            cardData.appartments_payers
                                .filter(ap => ap.payer)
                                .map(appartments_payer => (
                                    <div key={appartments_payer.id}>
                                        <p className="realty-card-info-label">
                                            {appartments_payer.payer.payer_type_id == 2 ? 'Владелец' : 'Контактное лицо'}
                                        </p>
                                        <p className="realty-card-info-value">
                                            {appartments_payer.payer.name}
                                            <br/>
                                            {formatPhone(appartments_payer.payer.phone)}
                                        </p>
                                    </div>
                                ))}
                            <Divider/>
                            <p className="realty-card-info-label">Услуги</p>
                            {cardData.services &&
                            cardData.services.map(service => (
                                <div key={service.id}>
                                    <Row className="realty-card-info-service">
                                        <Col span={4} className="realty-card-info-image">
                                            <SeviceImage type={service.id}/>
                                        </Col>
                                        <Col span={12} className="realty-card-info-name">
                                            {(serviceTypes[service.id] && serviceTypes[service.id].name) || service.name}
                                        </Col>
                                        <Col span={8}
                                             className={`realty-card-info-borrow ${service.borrow > 0 ? 'has-borrow' : ''}`}>
                                            {formatBorrow(service.borrow)}
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <Row className="realty-card-info-service">
                                <Col span={4} className="realty-card-info-image">
                                    {' '}
                                </Col>
                                <Col span={12} className="realty-card-info-name">
                                    Сумма
                                </Col>
                                <Col span={8} className="realty-card-info-borrow has-borrow">
                                    {formatBorrow(cardData.services && cardData.services.map(s => s.borrow).reduce((p, c) => p + c, 0))}
                                </Col>
                            </Row>
                            <div className="realty-card-info-action">
                                <Button className="realty-card-info-button" onClick={onDraftBillTemplate}>
                                    Сформировать счет
                                </Button>
                            </div>
                        </Card>
                    </Col>
                    <Col span={16} className="realty-card-items">
                        <Radio.Group
                            onChange={onChangeItemsType}
                            defaultValue={cardEventFilter}
                            className="realty-card-items-filter"
                        >
                            <Radio.Button value={REALTY_EVENT_TYPE_ALL}>Все</Radio.Button>
                            <Radio.Button value={REALTY_EVENT_TYPE_METERS}>Показания</Radio.Button>
                            <Radio.Button value={REALTY_EVENT_TYPE_BILLS}>Счета</Radio.Button>
                            <Radio.Button value={REALTY_EVENT_TYPE_PAYMENTS}>Оплаты</Radio.Button>
                            <Radio.Button value={REALTY_EVENT_TYPE_DEMANDS}>Заявки</Radio.Button>
                        </Radio.Group>
                        <DateFilter onChange={onChangeDateFilter}/>
                        {cardData.events &&
                        renderEvents(cardData.events.filter(filterEvents(cardEventFilter, cardEventDates)), onReadyBillTemplate)}
                        />
                    </Col>
                </Row>
            )}
            {billData && (
                <Modal
                    visible={isVisible}
                    onCancel={onCloseBillTemplate}
                    footer={null} width={1486}
                    style={{borderRadius: '20px'}}
                >
                    <BillTemplate
                        billData={billData}
                        onBillSave={onBillSave}
                    />
                </Modal>
            )}
            <div className="header">
                <div/>
            </div>
        </div>
    );
};

RealtyCard.propTypes = {
    realtyId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    isFetching: state.realtyCard.isFetching,
    isDataProcessing: state.realtyCard.isDataProcessing,
    cardData: state.realtyCard.data,
    billData: state.billTemplate.billData,
});

const mapDispatchToProps = {
    saveBillForRealtyCard,
    getRealtyCardData,
    getBillTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(RealtyCard);
