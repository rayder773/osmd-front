import realtyTypes from '../types/realty';

const initialState = {
  data: [],
  isFetching: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case realtyTypes.IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case realtyTypes.GET_DATA: {
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
