import owners from '../types/owners';

const initialState = {
  paymentsData: [],
  isFetching: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case owners.IS_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case owners.GET_DATA: {
      return {
        ...state,
        paymentsData: action.payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
