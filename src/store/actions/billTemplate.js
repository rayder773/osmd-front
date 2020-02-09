import * as billTemplateTypes from "../types/billTemplateTypes";
import {getBillTemplateForRealtyCardAPI, getCreatedBillTemplateForRealtyCardAPI, requestAdmin} from "../../api";
import {showNotification} from "./errors";
import {errorCodes} from "../../constants/errorMessages";
import {MODAL_REVIEW_REQUEST_FAILURE} from "../types/modalReview";

export const getBillTemplate = (id, func) => {
    let payload = [], response;

    return async dispatch => {
        dispatch({
            type: billTemplateTypes.BILL_TEMPLATE_REQUEST,
        });

        try {
            switch (func) {
                case 'startToCreate':
                    response = await requestAdmin(getBillTemplateForRealtyCardAPI, {id: id});
                    break;
                case 'created':
                    response = await requestAdmin(getCreatedBillTemplateForRealtyCardAPI, {id: id});
                    break;
            }

        } catch (err) {
            console.log(err)
        }

        if (!response || response.error) {
            dispatch(
                showNotification({
                    code: (response && response.code) || errorCodes.UNEXPECTED_ERROR,
                    message: (response && response.message) || '',
                })
            );
            // dispatch({type: MODAL_REVIEW_REQUEST_FAILURE});
            return;
        }

        console.log(response);

        if (response) {
            payload = response.data.result;
        }

        return dispatch({
            type: billTemplateTypes.BILL_TEMPLATE_SUCCESS,
            payload,
        });
    }
};