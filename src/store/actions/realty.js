import realtyTypes from '../types/realty';
import { showNotification } from './errors';
import { errorCodes } from '../../constants/errorMessages';

import { getOwnersDataAPI, requestAdmin } from '../../api';
// const api = new APIManager();

export const getRealtyData = () => {
  return async dispatch => {
    dispatch({
      type: realtyTypes.IS_FETCHING,
    });
    // const response = await getPaymentsDataAPI();
    let payload = [];
    const response = await requestAdmin(getOwnersDataAPI);

    console.log(response);
    if (!response) {
      dispatch(
        showNotification({
          code: errorCodes.UNEXPECTED_ERROR,
          message: '',
        })
      );
      return;
    }

    if (response.error) {
      // if response.code is <some value> ... then type = errorTypes.NO_RESPONSE!!!
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
    }
    // api.request(getPaymentsDataAPI, {params: 123});
    dispatch({
      type: realtyTypes.GET_DATA,
      payload,
    });
  };
};

export default { getRealtyData };
