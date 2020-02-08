import { useEffect } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import { errorMessages } from '../../constants/errorMessages';

import './styles.scss';

import { closeNotification } from '../../store/actions/errors';

const onClose = props => {
  props.dispatch(closeNotification());
};

const showErrorMessage = (props, code, message) => {
  const description = errorMessages[code] || message || 'Undefined error';
  notification.error({
    message: `Something went wrong.`,
    description,
    placement: 'topRight',
    onClose: () => {
      onClose(props);
    },
  });
};

const ErrorNotification = props => {
  const { showError, errorsNum, code, message } = props;

  useEffect(() => {
    if (showError) {
      showErrorMessage(props, code, message);
    }
  }, [errorsNum]);

  return null;
};

ErrorNotification.propTypes = {
  showError: PropTypes.bool,
  errorsNum: PropTypes.number,
  code: PropTypes.string,
  message: PropTypes.string,
};

ErrorNotification.defaultProps = {};

const mapStateToProps = state => ({
  showError: state.errors.showError,
  errorsNum: state.errors.errorsNum,
  code: state.errors.number,
  message: state.errors.message,
});

export default connect(mapStateToProps)(ErrorNotification);
