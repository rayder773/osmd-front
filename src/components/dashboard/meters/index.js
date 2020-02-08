/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filters, filterServices, mapToNormalData } from '../../../dataModels/metersData';
import { meretsRequest } from '../../../store/actions/meters';

import './styles.scss';
import ModalReview from './modalReview';

const columns = [
  {
    title: 'Услуги',
    dataIndex: 'service.image',
    sorter: (a, b) => `${a.service_data}`.localeCompare(b.service_data),
    filters: filterServices(),
    onFilter: (value, record) => record.service.type === value || record.service.type === undefined,
    align: 'left',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    // width: 100,
    align: 'center',
  },
  {
    title: 'Адрес дома',
    dataIndex: 'street',
    key: 'street',
    sorter: (a, b) => `${a.street}`.localeCompare(b.street),
    // width: 100,
    align: 'center',
  },
  {
    title: 'Квартира',
    dataIndex: 'app',
    key: 'app',
    sorter: (a, b) => a.app - b.app,
    // width: 100,
    align: 'center',
  },
  {
    title: 'Владелец',
    dataIndex: 'owner',
    key: 'owner',
    sorter: (a, b) => `${a.owner}`.localeCompare(b.owner),
    // width: 120,
    align: 'center',
  },
  {
    title: 'Показания',
    dataIndex: 'number',
    key: 'number_data',
    sorter: (a, b) => a.number_data - b.number_data,
    // width: 120,
    align: 'center',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    filters,
    onFilter: (value, record) => record.status_data === value,
    // width: 100,
    align: 'center',
  },
];

const Meters = props => {
  const { modalReviewDataId, meretsRequest, isFetching, metersData } = props;
  const [updatedMetersData, setMetersData] = useState([]);

  useEffect(() => {
    meretsRequest();
  }, []);

  useEffect(() => {
    const newData = mapToNormalData(metersData);

    setMetersData(newData);
  }, [metersData]);

  return (
    <div className="meters">
      <div>
        <div className="meters-header-container">
          <h2 className="meters-header">Показания счётчиков</h2>
          <span className="meters-header-editional"> для проверки {metersData.filter(m => m.status == 0).length}</span>
        </div>
        <Table
          dataSource={updatedMetersData}
          columns={columns}
          pagination={false}
          scroll={{ x: 0, y: 0 }}
          loading={isFetching}
        />
      </div>
      <div className="meters-footer">ВСЕ ПОКАЗАНИЯ</div>
      <ModalReview onClose={()=>{ meretsRequest() }} />
    </div>
  );
};

Meters.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  meretsRequest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  metersData: PropTypes.array,
};

Meters.defaultProps = {};

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  metersData: state.meters.metersData,
  isFetching: state.meters.isFetching,
  modalReviewDataId: state.modalReview.modalReviewData.id,
});

const mapDispatchToProps = {
  meretsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meters);
