import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import PaymentsCoponent from '../../components/dashboard/payments';

const Payments = () => (
  <div className="page-payments">
    <PaymentsCoponent />
  </div>
);

Payments.propTypes = {};

Payments.defaultProps = {};

export default Payments;
