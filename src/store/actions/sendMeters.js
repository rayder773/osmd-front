/* eslint-disable import/prefer-default-export */
import { showNotification } from './errors';
import { requestAdmin, sendMetersDataAPI } from '../../api';

export const changeMetersRequest = (value, serviceType, roomNumber) => async dispatch => {
  const response = await requestAdmin(sendMetersDataAPI, { value, serviceType, roomNumber });
  if (response.error) {
    dispatch(
      showNotification({
        code: response.code,
        message: response.message,
      })
    );
  }
};
