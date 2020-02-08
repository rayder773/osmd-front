import {
    MODAL_REVIEW_SAVE,
    MODAL_REVIEW_SAVE_SUCCESS,
    MODAL_REVIEW_SAVE_FAILURE,
    MODAL_REVIEW_CHANGE,
    MODAL_REVIEW_REQUEST_FAILURE,
    MODAL_REVIEW_REQUEST_SUCCESS,
    MODAL_REVIEW_REQUEST
} from '../types/modalReview';

import {showNotification} from './errors';
import {getServiceValueDataAPI, updateServiceValueStatusAPI, requestAdmin} from '../../api';
import {errorCodes} from "../../constants/errorMessages";

// fetch bill data for modal window
export function getModalReviewData(id) {
    return async (dispatch, getState) => {

        dispatch({type: MODAL_REVIEW_REQUEST, payload: {id}});

        let payload = [];
        const response = await requestAdmin(getServiceValueDataAPI, {id}); //TODO Для разных модалок разные методы

        if (!response || response.error) {
            // if response.code is <some value> ... then type = errorTypes.NO_RESPONSE!!!
            dispatch(
                showNotification({
                    code: (response && response.code) || errorCodes.UNEXPECTED_ERROR,
                    message: (response && response.message) || '',
                })
            );
            dispatch({type: MODAL_REVIEW_REQUEST_FAILURE});
            return;
        }

        if (response) {
            payload = response.data.result;
        }

        dispatch({type: MODAL_REVIEW_REQUEST_SUCCESS, payload});
    };
}

export function changeModalReview(payload) {
    return {
        type: MODAL_REVIEW_CHANGE,
        payload: payload
    };
}

export function closeModalReview() {
    return {
        type: MODAL_REVIEW_SAVE_SUCCESS,
    };
}

export function updateModalReviewStatus() {
    return async (dispatch, getState) => {
        const {modalReviewData} = getState().modalReview;

        dispatch({type: MODAL_REVIEW_SAVE});

        const response = await requestAdmin(updateServiceValueStatusAPI, {serviceValue: modalReviewData});

        if (!response || response.error) {
            // if response.code is <some value> ... then type = errorTypes.NO_RESPONSE!!!
            dispatch(
                showNotification({
                    code: (response && response.code) || errorCodes.UNEXPECTED_ERROR,
                    message: (response && response.message) || '',
                })
            );
            dispatch({type: MODAL_REVIEW_SAVE_FAILURE});
            return;
        }

        dispatch({type: MODAL_REVIEW_SAVE_SUCCESS});
    };
}
