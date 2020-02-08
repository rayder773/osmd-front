import {BILL_TEMPLATE_REQUEST, BILL_TEMPLATE_SUCCESS} from "../types/billTemplateTypes";

const initialState = {
    billData: {},
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case BILL_TEMPLATE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case BILL_TEMPLATE_SUCCESS:
            return {
                isFetching: false,
                billData: action.payload,
            };
        default:
            return state;
    }
}