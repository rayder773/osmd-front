import React from 'react';
import PropTypes from 'prop-types';
import RealtyComponent from '../../components/dashboard/realty';

import './styles.scss';

const Realty = () => (
  <div className="page-realty">
    <RealtyComponent />
  </div>
);

Realty.propTypes = {};

Realty.defaultProps = {};

export default Realty;
