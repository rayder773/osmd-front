import {
  PAYMENT_INDEX_FAILURE,
  PAYMENT_INDEX_META,
  PAYMENT_INDEX_REQUEST,
  PAYMENT_INDEX_SUCCESS,
} from '../types/payments';

import { INDEX_PAGE_SIZE_DEFAULT, INDEX_PAGE_SIZE_OPTIONS } from '../../constants/pagination';

const initialState = {
  paymentsData: [],
  meta: {
    page: 1,
    pageSize: INDEX_PAGE_SIZE_DEFAULT,
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    pageTotal: 1,
    total: 0,
    filter: '',
  },
  isFetching: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_INDEX_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PAYMENT_INDEX_SUCCESS: {

      return {
        ...state,
        paymentsData: action.payload,
        isFetching: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case PAYMENT_INDEX_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case PAYMENT_INDEX_META: {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    default:
      return state;
  }
}
