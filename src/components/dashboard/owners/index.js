/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Table, Input, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOwnersData } from '../../../store/actions/owners';
import OwnersGroup from '../ownersGroup';

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
        <div style={{display: "none"}}>
        <span className="positive">+{stat.positive}</span>
        <span className="spacer">|</span>
        <span className="neutral">{stat.neutral}</span>
        <span className="spacer">|</span>
        <span className="negative">-{stat.negative}</span>
        <span className="spacer">|</span>
        <span className="total">всего: {data.length}</span>
        </div>
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
    render: (text) => renderColor('ул. ' + text),
    width: 150,
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
    filterMultiple: true,
    filters: createServiceTypeFilter(serviceTypes),
    onFilter: (value, record) => record.serviceType.value === value || record.serviceType.value === undefined,
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

function onSearch(value, setPaymentsData, paymentsDataFiltered) {
  setPaymentsData(
    paymentsDataFiltered.filter(item => {
      if (!value || item.house.toString().includes(value)) {
        return true;
      }
      if (!value || item.room.toString().includes(value)) {
        return true;
      }
      if (!value || item.payer.toString().includes(value)) {
        return true;
      }
      if (!value || item.balance.toString().includes(value)) {
        return true;
      }
      return false;
    })
  );
}

function getSomeData(props) {
  props.dispatch(getOwnersData());
}
const renderDetails = (record, ...rest) => <OwnersGroup expanded={rest[2]} data={record} />;

const getFlatType = type => {
  return flatTypes[type] || 'Неизвестный';
};

const getServiceIcon = type => {
  const icon = serviceTypes[type];
  const url = icon ? icon.url : serviceIconUndefined;
  return <img src={url} alt="service icon" />;
};

const getTimeExpiration = (lastPay, now) => {
  const days = Math.floor((lastPay - now) / 24 / 60 / 60 / 1000);
  return <div className={getClassFromBalance(days)}>{`${days} дней`}</div>;
};

const getAddress = address => {
  if (!address) {
    return null;
  }

  const { street, app } = address;
  return `${street} ${app}`;
};

const getTotalBalanceFromServices = services => {
  if (!services) {
    return 0;
  }

  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += services[i].balance;
  }

  return total;
};

const getBalance = balance => {
  return <div className={getClassFromBalance(balance)}>{balance}</div>;
};

const getBalanceGroup = services => {
  if (!services) {
    return null;
  }

  const total = getTotalBalanceFromServices(services);
  return {
    text: <div className={getClassFromBalance(total)}>{total}</div>,
    value: total,
  };
};

const getLastPayment = (services, now) => {
  if (!services) {
    return null;
  }

  let minLastPay = now;
  for (let i = 0; i < services.length; i++) {
    if (services[i].lastPay < minLastPay) {
      minLastPay = services[i].lastPay;
    }
  }

  return { text: getTimeExpiration(minLastPay, now), value: minLastPay };
};

const filterServices = (services, appliedServiceFilter) => {
  if (!services) {
    return [];
  }

  return services.filter(service => {
    return !appliedServiceFilter || !appliedServiceFilter.length || appliedServiceFilter.includes(service.serviceType);
  });
};

const mapInpuData = (inputData, isGroupped, appliedServiceFilter) => {
  const now = Date.now();
  statistic.total = 0;
  let key = 0;
  let itemsToMap = inputData;
  if (!isGroupped) {
    itemsToMap = [];
    inputData.forEach(item => {
      item.services.forEach(service => {
        itemsToMap.push({
          ...item,
          key: key++,
          serviceType: service.id,
          lastPay: service.lastPay,
          balance: service.balance,
        });
      });
    });
  }

  return itemsToMap.map(item => {
    statistic.total += isGroupped ? getTotalBalanceFromServices(item.services) : parseFloat(item.balance);
    return {
      ...item,
      key: key++,
      services: filterServices(item.services, appliedServiceFilter['serviceType.text']),
      house: getAddress(item.address),
      flatType: { text: getFlatType(item.flatType.id), value: item.flatType.id },
      serviceType: { text: getServiceIcon(item.serviceType), value: item.serviceType },
      lastPay: isGroupped
        ? getLastPayment(item.services, now)
        : { text: getTimeExpiration(item.lastPay, now, item.balance), value: item.lastPay },
      balance: isGroupped ? getBalanceGroup(item.services) : { text: getBalance(item.balance), value: item.balance },
    };
  });
};

const groupByFlat = (isGroupped, setIsGroupped) => {
  setIsGroupped(isGroupped);
};

const Owners = props => {
  const { paymentsData, isFetching, dispatch } = props;
  const [paymentsDataFiltered, setPaymentsData] = useState([]);
  const [isGroupped, setIsGroupped] = useState(true);
  const [appliedServiceFilter, setAppliedServiceFilter] = useState([]);

  const renderGroupDetails = isGroupped ? renderDetails : null;

  // get data from server
  useEffect(() => {
    dispatch(getOwnersData());
  }, []);

  useEffect(() => {
    console.log('got payments data', paymentsData, appliedServiceFilter);
    setPaymentsData(mapInpuData(paymentsData, isGroupped, appliedServiceFilter));
  }, [paymentsData, isGroupped, appliedServiceFilter]);

  return (
    <div className="owners">
      <div className="header">
        <h3 className="title">Баланс</h3>
        <div>
          <Switch
            className="switch-green"
            id="switch_group"
            defaultChecked={isGroupped}
            onChange={checked => groupByFlat(checked, setIsGroupped)}
          />
          &nbsp;&nbsp;Показать все услуги вместе
        </div>
        <div>
          <Search
            placeholder="Поиск по таблице"
            onSearch={value => onSearch(value, setPaymentsData, paymentsDataFiltered)}
            enterButton
            allowClear
          />
        </div>
      </div>
      <Table
        className="table"
        dataSource={paymentsDataFiltered}
        columns={columns}
        expandedRowRender={renderGroupDetails}
        expandRowByClick
        loading={isFetching}
        pagination={false}
        scroll={{}}
        size="small"
        title={renderFooter}
        onChange={(a, appliedFilters) => {
          setAppliedServiceFilter(appliedFilters);
        }}
      />
      {/* <button
        type="button"
        onClick={() => {
          getSomeData(props);
        }}
      >
        Get some data...
      </button> */}
    </div>
  );
};

Owners.propTypes = {
  dispatch: PropTypes.func,
  paymentsData: PropTypes.array,
  isFetching: PropTypes.bool,
};

Owners.defaultProps = {
  dispatch: null,
  paymentsData: [],
  isFetching: false,
};

const mapStateToProps = state => ({
  isFetching: state.owners.isFetching,
  paymentsData: state.owners.paymentsData,
});

export default connect(mapStateToProps)(Owners);
