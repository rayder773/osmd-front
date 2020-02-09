import {
    BILL_TEMPLATE_FAILURE,
    BILL_TEMPLATE_REQUEST,
    BILL_TEMPLATE_SUCCESS_STATUS_DRAFT,
    BILL_TEMPLATE_SUCCESS_STATUS_READY
} from "../types/billTemplateTypes";

const initialState = {
    billData: {},
    isFetching: false,
    isSelected: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case BILL_TEMPLATE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case BILL_TEMPLATE_SUCCESS_STATUS_READY:
            return {
                isFetching: false,
                isSelected: false,
                billData: action.payload,
            };
        case BILL_TEMPLATE_SUCCESS_STATUS_DRAFT:
            return {
                isFetching: false,
                isSelected: true,
                billData: action.payload,
            };
        case BILL_TEMPLATE_FAILURE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}