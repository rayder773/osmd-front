import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import Meters from '../../components/dashboard/meters';
import Payments from '../../components/dashboard/payments';
import Requests from '../../components/dashboard/requests';
import Balance from '../../components/dashboard/balance';
import SendMeters from '../../components/dashboard/sendMeters';

const dashboard = () => (
  <div className="page-dashboard">
    <Meters />
    <Payments />
    <Requests />
    <Balance />
    <SendMeters />
  </div>
);

dashboard.propTypes = {};

dashboard.defaultProps = {};

export default dashboard;
