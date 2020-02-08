import users from '../types/users';

import { loginAdminAPI, requestAdmin } from '../../api';
// const api = new APIManager();

export const loginAdmin = () => {
  return async dispatch => {
    await requestAdmin(loginAdminAPI);
    dispatch({
      type: users.LOGIN,
    });
  };
};
