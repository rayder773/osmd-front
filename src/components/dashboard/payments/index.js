import React, {useState, useEffect, useCallback} from 'react';
import { Table, Input } from 'antd';
import {batch, connect} from 'react-redux';
import PropTypes from 'prop-types';
import {formatCurrency, formatDateTime, formatDate} from '../../../helpers';
import DateFilter from '../../widget/dateFilter';

import './styles.scss';
import { changeFilter, changePageSize, getPaymentsData, goToPage } from '../../../store/actions/payments';

// import { paymentsData } from '../../../dataModels/paymentsTableData';

const { Search } = Input;

function renderColor(text, record) {
  let clsName = 'positive';

  if (record.balance === 0) {
    clsName = 'neutral';
  } else if (record.balance < 0) {
    clsName = 'negative';
  }

  return {
    children: <div className={clsName}>{text}</div>,
  };
}

function renderFooter(data) {
  const stat = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  data.forEach(element => {
    if (element.balance > 0) {
      stat.positive++;
    } else if (element.balance < 0) {
      stat.negative++;
    } else {
      stat.neutral++;
    }
  });
  return (
    <div className="status">
      <div>
        <span className="positive">+{stat.positive}</span>
        <span className="spacer">|</span>
        <span className="neutral">{stat.neutral}</span>
        <span className="spacer">|</span>
        <span className="negative">-{stat.negative}</span>
        <span className="spacer">|</span>
        <span className="total">всего: {data.length}</span>
      </div>
      <div>ВСЕ ЖИЛЬЦЫ</div>
    </div>
  );
}

const columns = [
  {
    title: 'Дата оплаты',
    dataIndex: 'dateOf',
    sorter: (a, b) => new Date(a.dateOf) - new Date(b.dateOf),
    render: formatDate,
    width: 150,
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
        return 'ул.' + row.appartment.building.street_name + ', ' + row.appartment.building.number
    },
    width: 250,
  },
  {
    title: 'Кв',
    dataIndex: 'appartment.appartment_number',
    sorter: (a, b) => a.appartment.appartment_number - b.appartment.appartment_number,
    width: 70,
    align: 'center',
  },
  {
    title: 'ФИО Владельца',
    dataIndex: 'bill.payer.name'
  },
  {
    title: 'Оплачено по счету',
    dataIndex: 'bill.number',
    render: (text, row) => {
      return '№ ' + row.bill.number + ' от ' + formatDate(row.bill.dateOf)
    },
  },
  {
    title: 'Сумма оплаты, грн',
    dataIndex: 'value',
    width: 150,
    align: 'right',
    render: formatCurrency,
  },
];

const Payments = props => {
  const { paymentsData, meta, isFetching, dispatch } = props;

  useEffect(() => {
    // get data from server
    dispatch(getPaymentsData());
  }, []);

console.warn('paymentsData=', paymentsData);

  const onSearch = useCallback(
      value => {
        const filter = { ...meta.filter, number: value };
        batch(() => {
          dispatch(changeFilter(filter));
          dispatch(getPaymentsData());
        });
      },
      [dispatch, meta.filter]
  );

  const onChangeDateFilter = useCallback(
      ({ from, to }) => {
        const filter = { ...meta.filter, ...{ from, to } };
        batch(() => {
          dispatch(changeFilter(filter));
          dispatch(getPaymentsData());
        });
      },
      [dispatch, meta.filter]
  );

  const pagination = {
    showSizeChanger: true,
    onShowSizeChange: (_, pageSize) => {
      dispatch(changePageSize(pageSize));
      dispatch(getPaymentsData());
    },
    onChange: page => {
      dispatch(goToPage(page));
      dispatch(getPaymentsData());
    },
    pageSizeOptions: meta.pageSizeOptions,
    total: meta.total,
    showTotal: (total, range) => `${range[0]} - ${range[1]} из ${total}`,
    current: meta.page,
    pageSize: meta.pageSize,
  };

  return (
    <div className="payments">
      <div className="header">
        <h3 className="title">Оплаты</h3>
        <DateFilter onChange={onChangeDateFilter} />
        <div>
          <Search placeholder="Поиск по номеру" onSearch={value => onSearch(value)} enterButton allowClear />
        </div>
      </div>
      <Table
        rowKey="id"
        className="table"
        dataSource={paymentsData}
        columns={columns}
        loading={isFetching}
        pagination={pagination}
        scroll={{}}
        size="small"
      />
    </div>
  );
};

Payments.propTypes = {
  dispatch: PropTypes.func,
  paymentsData: PropTypes.array,
  isFetching: PropTypes.bool,
};

Payments.defaultProps = {
  dispatch: null,
  paymentsData: [],
  isFetching: false,
};

const mapStateToProps = state => ({
  isFetching: state.payments.isFetching,
  paymentsData: state.payments.paymentsData,
  meta: state.payments.meta,
});

export default connect(mapStateToProps)(Payments);
