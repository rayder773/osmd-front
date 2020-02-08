/* eslint-disable import/prefer-default-export */
import { requestMeters } from '../types/meters';
import { showNotification } from './errors';
import { requestAdmin, handleMetersDataAPI } from '../../api';

export const meretsRequest = (id = 0, status = 0) => async dispatch => {
  dispatch({
    type: requestMeters.IS_FETCHING,
  });

  let payload = [];
  const response = await requestAdmin(handleMetersDataAPI, { id, status });
  if (response.error) {
    dispatch(
      showNotification({
        code: response.code,
        message: response.message,
      })
    );
    return;
  }
  if (response) {
    payload = response.data.result;
    dispatch({
      type: requestMeters.GET_DATA,
      payload,
    });
  }
};
