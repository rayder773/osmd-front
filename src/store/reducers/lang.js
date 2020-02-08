// import languageTypes from '../types/lang';

const initialState = {
  language: 'ua',
};

export default function(state = initialState, action) {
  if (action.language) {
    return {
      ...state,
      language: action.language,
    };
  }

  return state;
}
