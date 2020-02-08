import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Input } from 'antd';
import { getRealtyData } from '../../../store/actions/realty';
import { formatCurrency } from '../../../helpers';
import './styles.scss';

const { Search } = Input;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    // width: 180,
    align: 'center',
  },
  {
    title: 'Адрес дома',
    dataIndex: 'address.street',
    // width: 150,
    align: 'right',
    render: (text, r) => `ул. ${r.address.street}, ${r.address.app}`,
  },
  {
    title: '№ Кв./Оф.',
    dataIndex: 'room',
    // width: 150,
    align: 'center',
  },
  {
    title: 'Тип',
    dataIndex: 'flatType.name',
    // width: 180,
    align: 'center',
  },
  {
    title: 'Владелец',
    dataIndex: 'payer',
    // width: 150,
  },
  {
    title: 'Площадь',
    dataIndex: 'square',
    // width: 150,
  },
  {
    title: 'Баланс',
    dataIndex: 'balance',
    align: 'right',
  },
];

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

const mapInpuData = data => {
  return data.map(item => {
    return {
      ...item,
      balance: formatCurrency(getTotalBalanceFromServices(item.services)),
    };
  });
};

const Realty = props => {
  const { dispatch, tableData, isFetching } = props;
  const [tableDataFiltered, setTableData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getRealtyData());
  }, []);

  useEffect(() => {
    console.log('got realty data', tableData);
    // setPaymentsData(mapInpuData(paymentsData, isGroupped, appliedServiceFilter));
    setTableData(mapInpuData(tableData));
  }, [tableData]);

  return (
    <div className="realty">
      <div className="header">
        <h3 className="title">Всего объектов: {tableDataFiltered.length ? `${tableDataFiltered.length}` : ''}</h3>
        <div>
          <Search placeholder="Поиск по таблице" onSearch={value => {}} enterButton allowClear />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableDataFiltered}
        loading={isFetching}
        pagination={false}
        scroll={{}}
        size="small"
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              history.push(`/realty/${record.id}`);
            },
          };
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isFetching: state.realty.isFetching,
  tableData: state.realty.data,
});

export default connect(mapStateToProps)(Realty);
