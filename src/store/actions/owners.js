import ownersTypes from '../types/owners';
import { showNotification } from './errors';
import { errorCodes } from '../../constants/errorMessages';

import { getOwnersDataAPI, requestAdmin } from '../../api';
// const api = new APIManager();

export const getOwnersData = () => {
  return async dispatch => {
    dispatch({
      type: ownersTypes.IS_FETCHING,
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
      type: ownersTypes.GET_DATA,
      payload,
    });
  };
};

export default { getOwnersData };
