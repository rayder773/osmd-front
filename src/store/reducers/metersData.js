import { requestMeters } from '../types/meters';

const initialState = {
  metersData: [],
  isFetching: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case requestMeters.IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case requestMeters.GET_DATA: {
      return {
        ...state,
        metersData: action.payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
