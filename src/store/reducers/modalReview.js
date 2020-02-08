import {
  MODAL_REVIEW_REQUEST,
  MODAL_REVIEW_REQUEST_SUCCESS,
  MODAL_REVIEW_REQUEST_FAILURE,
  MODAL_REVIEW_CHANGE,
  MODAL_REVIEW_SAVE,
  MODAL_REVIEW_SAVE_FAILURE,
  MODAL_REVIEW_SAVE_SUCCESS
} from "../types/modalReview";

const initialState = {
  modalReviewData: {},
  isFetching: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MODAL_REVIEW_REQUEST: {
      return {
        ...state,
        modalReviewData: {
          ...state.modalReviewData,
          ...action.payload
        },
        isFetching: true,
      };
    }
    case MODAL_REVIEW_REQUEST_SUCCESS: {
      return {
        ...state,
        modalReviewData: action.payload,
        isFetching: false,
      };
    }
    case MODAL_REVIEW_REQUEST_FAILURE: {
      return {
        ...state,
        modalReviewData: {},
        isFetching: false,
      };
    }
    case MODAL_REVIEW_CHANGE: {
      console.error('MODAL_REVIEW_CHANGE', action.payload);
      return {
        ...state,
        modalReviewData: {
          ...state.modalReviewData,
          ...action.payload
        }
      };
    }
    case MODAL_REVIEW_SAVE: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case MODAL_REVIEW_SAVE_SUCCESS: {
      return {
        ...state,
        modalReviewData: {},
        isFetching: false,
      };
    }
    case MODAL_REVIEW_SAVE_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}
