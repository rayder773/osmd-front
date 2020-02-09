import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';
import {serviceTypes, SeviceImage} from '../../../../../dataModels/metersData';
import {formatCurrency} from '../../../../../helpers';
import './styles.scss';

const {Column, ColumnGroup} = Table;

const BillTemplate = ({billData, onBillSave, isSelected}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const addressText = `${'Одесса' + ', ул. '}${billData.appartment &&
    billData.appartment.building &&
    billData.appartment.building.street_name}, кв. ${billData.appartment && billData.appartment.appartment_number}`;
    const ownerText = billData.payer && billData.payer.name;
    let billSumm = 0;
    let billSelectedSumm = 0;
    selectedRows &&
    selectedRows.forEach(row => {
        billSelectedSumm += row.value || 0;
    });
    billData.billLists &&
    billData.billLists.forEach(row => {
        billSumm += row.value || 0;
    });

    const onBillClick = event => {
        onBillSave({
            ...billData,
            billLists: selectedRows,
        });
    };

    const columns = [
        {
            title: <div className="bill-template-th-colspan">Услуга</div>,
            dataIndex: 'service_type.id',
            ellipsis: true,
            width: 30,
            render: text => <SeviceImage type={parseInt(text)}/>,
        },
        {
            title: '',
            width: 120,
            dataIndex: 'service_type.name',
            ellipsis: true,
            render: (text, row, b) => (serviceTypes[row.service_type_id] ? serviceTypes[row.service_type_id].name : text),
        },
        {
            title: 'Тариф',
            width: 120,
            dataIndex: 'price',
            ellipsis: true,
            align: 'right',
            render: (text, row) => formatCurrency(text, `грн/${row.service_type.measure}`),
        },
        {
            title: 'Текущие показания',
            width: 100,
            dataIndex: 'curMeter',
            ellipsis: true,
            align: 'right',
            render: text => (text === 0 ? '-' : text),
        },
        {
            title: 'Предыд. показания',
            width: 100,
            dataIndex: 'prevMeter',
            ellipsis: true,
            align: 'right',
            render: text => (text === 0 ? '-' : text),
        },
        {
            title: 'Разница',
            width: 100,
            dataIndex: 'Разница',
            ellipsis: true,
            align: 'right',
            render: (text, row) => row.meter,
        },
        {
            title: 'Количество',
            width: 100,
            dataIndex: 'meter',
            ellipsis: true,
            align: 'right',
            render: (text, row) => `${row.meter} ${row.service_type.measure}`,
        },
        {
            title: 'Сумма',
            width: 100,
            dataIndex: 'Сумма',
            ellipsis: true,
            align: 'right',
            render: (text, row) => row.meter * row.price,
        },
        {
            title: 'Субс./Льгота',
            width: 100,
            dataIndex: 'discount',
            ellipsis: true,
            align: 'right',
            render: text => (text === 0 ? '-' : text),
        },
        {
            title: 'Начислено',
            width: 120,
            dataIndex: 'value',
            ellipsis: true,
            align: 'right',
            render: text => formatCurrency(text, 'грн'),
        },
    ];

    return (
        <div className="bill-template">
            <h2 className="bill-template-title-name">Сформировать счет</h2>
            <div className="bill-template-title-period">от 24.01.2020 за период Декабрь</div>
            <div className="bill-template-header">
                <div className="bill-template-header-col">
          <span>
            <label>Адрес:</label>
              {addressText}
          </span>
                    <span>
            <label>Плательщик:</label>
                        {ownerText}
          </span>
                    <span>
            <label>№ л/счета:</label>019001080
          </span>
                </div>
                <div className="bill-template-header-col">
          <span>
            <label>Статус счета:</label>
            Черновик
          </span>
                    <span>
            <label>Статус оплаты:</label>
            Не оплачен
          </span>
                </div>
                <div className="bill-template-header-col">
          <span>
            <label>Долг прошлых перодов:</label>
            115,00 грн
          </span>
                    <span>
            <label>Начислено за период:</label>2 400 грн
          </span>
                    <span>
            <label>Аванс:</label> 0,00 грн
          </span>
                </div>
            </div>
            <div className="bill-template-list">
                <Table
                    rowSelection={isSelected && {
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            setSelectedRows(selectedRows);
                        },
                    }}
                    columns={columns}
                    dataSource={billData.billLists}
                    footer={null}
                    pagination={false}
                    size="small"
                    tableLayout="fixed"
                    rowKey="service_type_id"
                />
            </div>
            <div className="bill-template-footer">
                <div className="bill-template-footer-price">
                    {formatCurrency(billSelectedSumm, '')}
                    <span>грн</span>
                </div>
                <div className="bill-template-footer-divider"/>
                <span>Сумма оплаты (грн)</span>
            </div>
            <div className="bill-template-formbill-btn-container">
                <button
                    type="button"
                    className="bill-template-formbill-btn"
                    onClick={onBillClick}
                    disabled={selectedRows.length === 0}
                >
                    Сформировать
                </button>
            </div>
        </div>
    );
};

BillTemplate.propTypes = {
    onBillSave: PropTypes.func.isRequired,
};

BillTemplate.defaultProps = {};

export default BillTemplate;
