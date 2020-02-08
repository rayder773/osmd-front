import errorTypes from '../types/errors';

const initialState = {
  showError: false,
  errorsNum: 0,
  code: 0,
  message: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case errorTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        showError: true,
        errorsNum: state.errorsNum + 1,
        code: action.code,
        message: action.message,
      };
    case errorTypes.CLOSE_NOTIFICATION: {
      return {
        ...state,
        showError: false,
        errorsNum: state.errorsNum - 1,
      };
    }
    default:
      return state;
  }
}
