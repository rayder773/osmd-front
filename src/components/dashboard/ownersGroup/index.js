/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Table, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOwnersData } from '../../../store/actions/owners';

import serviceIcon0 from '../../../assets/images/services/flame.png';
import serviceIcon1 from '../../../assets/images/services/flash.png';
import serviceIcon2 from '../../../assets/images/services/heating.png';
import serviceIcon3 from '../../../assets/images/services/internet.png';
import serviceIcon4 from '../../../assets/images/services/water.png';
import serviceIcon5 from '../../../assets/images/services/lift.png';
import serviceIcon6 from '../../../assets/images/services/key.png';
import serviceIconUndefined from '../../../assets/images/services/undefined.png';

import './styles.scss';

// import { paymentsData } from '../../../dataModels/paymentsTableData';
const downIcon = () => <Icon type="down" />;
const expandIcon = () => <Icon type="right" />;
const { Search } = Input;
const statistic = {
  total: 0,
};

// We should receive it from server
const flatTypes = {
  0: 'Квартира',
  1: 'Офис',
  2: 'Магазин',
  3: 'Салон красоты',
};

const serviceTypes = {
  0: { url: serviceIcon0, name: 'Газ' },
  1: { url: serviceIcon1, name: 'Электроэнергия' },
  2: { url: serviceIcon2, name: 'Отопление' },
  3: { url: serviceIcon3, name: 'Интернет' },
  4: { url: serviceIcon4, name: 'Вода' },
  5: { url: serviceIcon5, name: 'Лифт' },
  6: { url: serviceIcon6, name: 'Аренда' },
  7: { url: serviceIcon6, name: 'Охрана' },
};

const getClassFromBalance = balance => {
  let clsName = 'positive';

  if (balance === 0) {
    clsName = 'neutral';
  } else if (balance < 0) {
    clsName = 'negative';
  }

  return clsName;
};

const createServiceTypeFilter = serviceTypes => {
  return Object.keys(serviceTypes).map(key => {
    return { text: serviceTypes[key].name, value: parseInt(key, 10) };
  });
};

const createFlatTypeFilter = flatTypes => {
  return Object.keys(flatTypes).map(key => {
    return { text: flatTypes[key], value: parseInt(key, 10) };
  });
};

function renderColor(text, record) {
  const clsName = '';
  // let clsName = 'positive';

  // if (record.balance === 0) {
  //   clsName = 'neutral';
  // } else if (record.balance < 0) {
  //   clsName = 'negative';
  // }

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
      <div>
        Общая сумма: <span className={getClassFromBalance(statistic.total)}>{statistic.total}</span>
      </div>
    </div>
  );
}

const columns = [
  {
    title: 'Адрес дома',
    dataIndex: 'house',
    sorter: (a, b) => a.house - b.house,
    render: renderColor,
    width: 150,
    align: 'right',
  },
  {
    title: 'Квартира',
    dataIndex: 'room',
    sorter: (a, b) => a.room - b.room,
    render: renderColor,
    width: 150,
    align: 'center',
  },
  {
    title: 'Тип помещения',
    dataIndex: 'flatType.text',
    filters: createFlatTypeFilter(flatTypes),
    onFilter: (value, record) => record.flatType.value === value,
    filterIcon: downIcon,
    render: renderColor,
    width: 180,
    align: 'center',
  },
  {
    title: 'Услуги',
    dataIndex: 'serviceType.text',
    filters: createServiceTypeFilter(serviceTypes),
    onFilter: (value, record) => record.serviceType.value === value,
    filterIcon: downIcon,
    render: renderColor,
    width: 100,
    align: 'center',
  },
  {
    title: 'Владелец',
    dataIndex: 'payer',
    sorter: (a, b) => a.payer.localeCompare(b.payer),
    render: renderColor,
    width: 200,
  },
  {
    title: 'Просрочено',
    dataIndex: 'lastPay.text',
    sorter: (a, b) => a.lastPay.value - b.lastPay.value,
    render: renderColor,
    width: 150,
  },
  {
    title: 'Баланс',
    dataIndex: 'balance.text',
    sorter: (a, b) => a.balance.value - b.balance.value,
    width: 100,
    render: renderColor,
    align: 'right',
  },
];

function onSearch(value, setPaymentsData) {
  // setPaymentsData(
  //   paymentsData.filter(item => {
  //     if (item.house.toString().includes(value)) {
  //       return true;
  //     }
  //     if (item.room.toString().includes(value)) {
  //       return true;
  //     }
  //     if (item.payer.toString().includes(value)) {
  //       return true;
  //     }
  //     if (item.balance.toString().includes(value)) {
  //       return true;
  //     }
  //     return false;
  //   })
  // );
}

function getSomeData(props) {
  props.dispatch(getOwnersData());
}

const getFlatType = type => {
  console.log('getFlatType', type);
  return flatTypes[type] || 'Неизвестный';
};

const getServiceIcon = type => {
  const icon = serviceTypes[type];
  const url = icon ? icon.url : serviceIconUndefined;
  return <img src={url} alt="service icon"></img>;
};

const getTimeExpiration = (lastPay, now, balance) => {
  const days = Math.floor((lastPay - now) / 24 / 60 / 60 / 1000);
  return <div className={getClassFromBalance(balance)}>{`${days} дней`}</div>;
};

const getAddress = ({ street, app }) => {
  return `${street} ${app}`;
};

const getTotalBalanceFromServices = services => {
  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += services[i].balance;
  }

  return total;
};

const getBalance = balance => {
  return <div className={getClassFromBalance(balance)}>{balance}</div>;
};

const mapInpuData = inputData => {
  const now = Date.now();
  statistic.total = 0;
  let key = 0;
  console.log('mapInpuData', inputData);

  return inputData.services.map(item => {
    statistic.total += parseFloat(item.balance);
    return {
      ...item,
      key: key++,
      house: getAddress(inputData.address),
      room: inputData.room,
      payer: inputData.payer,
      flatType: inputData.flatType,
      serviceType: { text: getServiceIcon(item.id), value: item.id },
      lastPay: { text: getTimeExpiration(item.lastPay, now, item.balance), value: item.lastPay },
      balance: { text: getBalance(item.balance), value: item.balance },
    };
  });
};

const OwnersGroup = props => {
  const { paymentsData, isFetching, dispatch, expanded, data } = props;
  const [paymentsDataFiltered, setPaymentsData] = useState([]);

  console.log('Render expanded row', data);
  useEffect(() => {
    // get data from server
    // dispatch(getOwnersData());
    setPaymentsData(mapInpuData(data));
  }, [data]);

  // useEffect(() => {
  //   console.log('got payments data', paymentsData);
  //   setPaymentsData(mapInpuData(paymentsData));
  // }, [paymentsData]);

  return (
    <div className="owner-groups">
      <Table
        className=""
        dataSource={paymentsDataFiltered}
        columns={columns}
        loading={isFetching}
        pagination={false}
        rowClassName={() => 'owner-groups'}
        // scroll={{ y: 370 }}
        size="small"
        bordered={false}
        showHeader={false}
        // footer={renderFooter}
      />
    </div>
  );
};

OwnersGroup.propTypes = {
  dispatch: PropTypes.func,
  paymentsData: PropTypes.array,
  isFetching: PropTypes.bool,
  expanded: PropTypes.bool,
};

OwnersGroup.defaultProps = {
  dispatch: null,
  paymentsData: [],
  isFetching: false,
  expanded: false,
};

const mapStateToProps = state => ({
  isFetching: state.owners.isFetching,
  paymentsData: state.owners.paymentsData,
});

export default connect(mapStateToProps)(OwnersGroup);
