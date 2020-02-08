import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OwnersComponent from '../../components/dashboard/owners';

import './styles.scss';

const Owners = props => (
  <div className="page-owners">
    <OwnersComponent />
  </div>
);

Owners.propTypes = {};

Owners.defaultProps = {};

const mapStateToProps = state => ({
  // isFetching: state.payments.isFetching,
  // paymentsData: state.payments.paymentsData,
});

export default connect(mapStateToProps)(Owners);
