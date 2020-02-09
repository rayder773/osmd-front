/* eslint no-mixed-operators: "off" */
import realtyCardTypes from '../types/realtyCard';
import {BILL_TEMPLATE_SUCCESS_STATUS_READY} from "../types/billTemplateTypes";
import { showNotification } from './errors';
import { errorCodes } from '../../constants/errorMessages';

import {
  getRealtyCardDataAPI,
  requestAdmin,
  saveBillForRealtyCardAPI,
} from '../../api';

export const getRealtyCardData = realtyId => {
  return async dispatch => {
    dispatch({
      type: realtyCardTypes.IS_FETCHING,
    });
    let payload = [];
    const response = await requestAdmin(getRealtyCardDataAPI, { id: realtyId });

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

    dispatch({
      type: realtyCardTypes.GET_DATA,
      payload,
    });
  };
};

export const saveBillForRealtyCard = bill => {
  return async dispatch => {
    dispatch({
      type: realtyCardTypes.IS_DATA_PROCESSING,
    });

    const response = await requestAdmin(saveBillForRealtyCardAPI, { bill });

    console.log('saveBillForRealtyCardAPI', response);
    if (!response || response.error) {
      // if response.code is <some value> ... then type = errorTypes.NO_RESPONSE!!!
      dispatch(
        showNotification({
          code: (response && response.code) || errorCodes.UNEXPECTED_ERROR,
          message: (response && response.message) || '',
        })
      );
      dispatch({
        type: realtyCardTypes.IS_DATA_PROCESSING,
        payload: false,
      });
      return;
    }

    dispatch({
      type: realtyCardTypes.BILL_CLOSED,
    });

    dispatch({
      type: BILL_TEMPLATE_SUCCESS_STATUS_READY,
      payload: response.data.result
    });
    console.warn('getRealtyCardData >>> ', bill.appartment_Id);
    dispatch(getRealtyCardData(bill.appartment_Id));
  };
};

