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

    default:
      return state;
  }
}
