import errorTypes from '../types/errors';

export const showNotification = ({ code, message }) => {
  return async dispatch => {
    dispatch({
      type: errorTypes.SHOW_NOTIFICATION,
      code,
      message,
    });
  };
};

export const closeNotification = () => {
  return async dispatch => {
    dispatch({
      type: errorTypes.CLOSE_NOTIFICATION,
    });
  };
};

export default { closeNotification };
