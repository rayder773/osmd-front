import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAdmin } from '../../store/actions/users';

import './styles.scss';

function login(props) {
  props.dispatch(loginAdmin());
}

const Login = props => (
  <div className="page-login">
    <h2>Страница входа</h2>
    <button onClick={() => login(props)}>Login as admin</button>
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

const mapStateToProps = state => ({
  // isFetching: state.payments.isFetching,
  // paymentsData: state.payments.paymentsData,
});

export default connect(mapStateToProps)(Login);
