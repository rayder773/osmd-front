import realtyCardTypes from '../types/realtyCard';

const initialState = {
  data: {},
  isFetching: false,
  isDataProcessing: false,
  bill: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case realtyCardTypes.IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
        isDataProcessing: false,
      };
    }
    case realtyCardTypes.GET_DATA: {
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    }
    case realtyCardTypes.IS_DATA_PROCESSING: {
      return {
        ...state,
        isDataProcessing: action.payload === undefined ? true : action.payload,
      };
    }
    case realtyCardTypes.GOT_BILL_TEMPLATE: {
      return {
        ...state,
        bill: action.payload,
        isDataProcessing: false,
      };
    }
    case realtyCardTypes.BILL_CLOSED: {
      return {
        ...state,
        // bill: null,
        isDataProcessing: false,
      };
    }
    default:
      return state;
  }
}
