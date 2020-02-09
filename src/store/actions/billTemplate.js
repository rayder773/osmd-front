import * as billTemplateTypes from "../types/billTemplateTypes";
import {
    BILL_TEMPLATE_FAILURE,
    BILL_TEMPLATE_SUCCESS_STATUS_DRAFT,
    BILL_TEMPLATE_SUCCESS_STATUS_READY
} from "../types/billTemplateTypes";
import billStatusTypes from "../../constants/billStatusTypes";
import {getBillTemplateForRealtyCardAPI, getCreatedBillTemplateForRealtyCardAPI, requestAdmin} from "../../api";
import {showNotification} from "./errors";
import {errorCodes} from "../../constants/errorMessages";

export const getBillTemplate = (id, status) => {
    let payload = [],
        response = {},
        billStatus = '';

    return async dispatch => {
        dispatch({
            type: billTemplateTypes.BILL_TEMPLATE_REQUEST,
        });


        try {
            switch (status) {
                case billStatusTypes.DRAFT:
                    response = await requestAdmin(getBillTemplateForRealtyCardAPI, {id: id});
                    billStatus = BILL_TEMPLATE_SUCCESS_STATUS_DRAFT;
                    break;
                case billStatusTypes.READY:
                    response = await requestAdmin(getCreatedBillTemplateForRealtyCardAPI, {id: id});
                    billStatus = BILL_TEMPLATE_SUCCESS_STATUS_READY;
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
            dispatch({type: BILL_TEMPLATE_FAILURE});
            return;
        }

        console.log(response);

        if (response) {
            payload = response.data.result;
        }

        return dispatch({
            type: billStatus,
            payload,
        });
    }
};