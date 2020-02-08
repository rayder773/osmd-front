import React, { useEffect, useCallback } from 'react';
import { Table, Input } from 'antd';
import { connect, batch } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import BillPaymentStatusTypes from '../../../constants/billPaymentStatusTypes';
import BillStatusTypes from '../../../constants/billStatusTypes';
import { getBillsData, goToPage, changePageSize, changeFilter } from '../../../store/actions/bills';
import { formatCurrency, formatDate, formatMonth, formatDateDiff } from '../../../helpers';
import DateFilter from '../../widget/dateFilter';

import './styles.scss';

const { Search } = Input;

function renderColor(text, record) {
  let clsName = 'neutral';

  if (record.paymentStatus === BillPaymentStatusTypes.PAID) {
    clsName = 'positive';
  } else {
    clsName = 'negative';
  }

  return {
    children: <div className={clsName}>{text}</div>,
  };
}


const Bills = props => {
  const { billsData, meta, isFetching, dispatch } = props;
  const intl = useIntl();

  const columns = [
    {
      title: 'Номер счета',
      dataIndex: 'number',
      width: 120,
    },
    {
      title: 'Дата счета',
      dataIndex: 'дата',
      width: 100,
      render: (text, row) => formatDate(row.dateOf),
    },
    {
      title: 'Адрес дома',
      dataIndex: 'appartment.building.number',
      sorter: (a, b) => a.appartment.building.number - b.appartment.building.number,
      filters: [
        { text: 'Дом 1', value: '1' },
        { text: 'Дом 2', value: '2' },
      ],
      onFilter: (value, r) => r.appartment.building.number == value,
      render: (text, row) => {
        return `ул.${row.appartment.building.street_name}, ${row.appartment.building.number}`;
      },
      width: 150,
    },
    {
      title: 'Квартира/Офис',
      dataIndex: 'appartment.appartment_number',
      sorter: (a, b) => a.appartment.appartment_number - b.appartment.appartment_number,
      width: 150,
      align: 'center',
    },
    {
      title: 'Период (месяц)',
      dataIndex: 'dateOf',
      sorter: (a, b) => new Date(a.dateOf) - new Date(b.dateOf),
      render: formatMonth,
      width: 110,
    },
    {
      title: 'Сумма счета, грн',
      dataIndex: 'value',
      width: 150,
      align: 'right',
      render: formatCurrency,
    },
    {
      title: 'Задолженность, дни',
      dataIndex: 'Задолженность',
      width: 150,
      align: 'right',
      render: (text, record) =>
        record.paymentStatus === BillPaymentStatusTypes.PAID
          ? '-'
          : renderColor(formatDateDiff(new Date(record.dateOf), new Date()), record),
    },
    {
      title: 'Статус',
      dataIndex: 'paymentStatus',
      width: 150,
      align: 'right',
      filters: Object.values(BillPaymentStatusTypes).map(type => ({
        text: intl.messages[`db.bill.paymentStatus.${type}`],
        value: type,
      })),
      onFilter: (value, r) => r.paymentStatus === value,
      render: (text, record) => renderColor(intl.messages[`db.bill.paymentStatus.${text}`], record),
    },
  ];

  useEffect(() => {
    // get data from server
    dispatch(getBillsData());
  }, []);

  const onSearch = useCallback(
    value => {
      const filter = { ...meta.filter, number: value };
      batch(() => {
        dispatch(changeFilter(filter));
        dispatch(getBillsData());
      });
    },
    [dispatch, meta.filter]
  );

  const onChangeDateFilter = useCallback(
    ({ from, to }) => {
      const filter = { ...meta.filter, ...{ from, to } };
      batch(() => {
        dispatch(changeFilter(filter));
        dispatch(getBillsData());
      });
    },
    [dispatch, meta.filter]
  );

  const pagination = {
    showSizeChanger: true,
    onShowSizeChange: (_, pageSize) => {
      dispatch(changePageSize(pageSize));
      dispatch(getBillsData());
    },
    onChange: page => {
      dispatch(goToPage(page));
      dispatch(getBillsData());
    },
    pageSizeOptions: meta.pageSizeOptions,
    total: meta.total,
    showTotal: (total, range) => `${range[0]} - ${range[1]} из ${total}`,
    current: meta.page,
    pageSize: meta.pageSize,
  };

  return (
    <div className="bills">
      <div className="header">
        <h3 className="title">Счета</h3>
        <DateFilter onChange={onChangeDateFilter} />
        <div>
          <Search placeholder="Поиск по номеру" onSearch={value => onSearch(value)} enterButton allowClear />
        </div>
      </div>
      <Table
        rowKey="id"
        className="table"
        dataSource={billsData}
        columns={columns}
        loading={isFetching}
        pagination={pagination}
        scroll={{}}
        size="small"
      />
    </div>
  );
};

Bills.propTypes = {
  dispatch: PropTypes.func,
  billsData: PropTypes.array,
  isFetching: PropTypes.bool,
};

Bills.defaultProps = {
  dispatch: null,
  billsData: [],
  isFetching: false,
};

const mapStateToProps = state => ({
  isFetching: state.bills.isFetching,
  billsData: state.bills.billsData,
  meta: state.bills.meta,
});

export default connect(mapStateToProps)(Bills);
