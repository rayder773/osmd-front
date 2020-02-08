import modalTypes from '../types/modal';

const initialState = {
  isOpen: false,
  active_id: 0,
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case modalTypes.OPEN_MODAL:
      return {
        isOpen: true,
        active_id: action.payload,
      };
    case modalTypes.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
