import '../types/bills';
import {
  BILL_INDEX_FAILURE, BILL_INDEX_META,
  BILL_INDEX_REQUEST,
  BILL_INDEX_SUCCESS
} from "../types/bills";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS
} from '../../constants/pagination';

const initialState = {
  billsData: [],
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
    case BILL_INDEX_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case BILL_INDEX_SUCCESS: {
      return {
        ...state,
        billsData: action.payload,
        isFetching: false,
        meta: {
          ...state.meta,
          ...action.meta,
        },
      };
    }
    case BILL_INDEX_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case BILL_INDEX_META: {
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
