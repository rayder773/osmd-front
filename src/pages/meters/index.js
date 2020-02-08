import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import MetersComponent from '../../components/dashboard/meters';

const Meters = () => (
  <div className="page-meters">
    <MetersComponent />
  </div>
);

Meters.propTypes = {};

Meters.defaultProps = {};

export default Meters;
