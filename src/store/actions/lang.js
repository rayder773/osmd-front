import languageTypes from '../types/lang';

export const changeLanguage = language => {
  console.log('language', language);
  return async dispatch => {
    dispatch({
      type: languageTypes[language],
      language,
    });
  };
};

export default { changeLanguage };
