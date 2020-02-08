import axios from 'axios';
import history from '../history';
import { errorCodes } from '../constants/errorMessages';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const TOKEN_EXPIRATION = 'tokenExpiration';

const isDev = process.env.NODE_ENV === 'development';

// const API_URL_APP = 'http://localhost:5001/api/app';
const API_URL_ADMIN = isDev ? process.env.REACT_APP_API_HOST_ADMIN : 'https://dev.api.bm.ossystem.ua/api/admin';

const responseErrors = {
  UNAUTORIZED: 40101,
  TOKEN_EXPIRED: 41901,
};

let accessToken = '';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

function isPublicMethod({ action, method }) {
  if (action === 'auth') {
    switch (method) {
      case 'refresh':
        return true;
      case 'signin':
        return true;
      default:
        return false;
    }
  }
  return false;
}

function isResponseOK(response, tid) {
  if (
    response &&
    response.data &&
    response.data.type &&
    response.data.type !== 'exception' &&
    response.data.tid === tid
  ) {
    return true;
  }

  return false;
}

function isUnauthorized(response) {
  // equal to response.data.message.code
  const {
    data: {
      message: { code },
    },
  } = response;

  if (code && code === responseErrors.UNAUTORIZED) {
    return true;
  }

  return false;
}

function isTokenExpired(response) {
  // equal to response.data.message.code
  const {
    data: {
      message: { code },
    },
  } = response;

  if (code && code === responseErrors.TOKEN_EXPIRED) {
    return true;
  }

  return false;
}

// export async function request(apiFunc, params, numOfTries = 2) {
//   const tid = parseInt(Date.now() / 1000, 10);
//   const tokenExpiration = parseInt(localStorage.getItem(TOKEN_EXPIRATION), 10);
//   accessToken = localStorage.getItem(ACCESS_TOKEN);

//   if (!accessToken && apiFunc !== loginUserAPI) {
//     history.push('/login');
//     return null;
//   }

//   const paramsAPI = params || {};
//   paramsAPI.tid = tid;
//   paramsAPI.accessToken = accessToken;

//   console.log('API Request:', numOfTries);

//   let response = { data: { message: { code: responseErrors.TOKEN_EXPIRED } } };

//   if (tid < tokenExpiration || apiFunc === loginUserAPI) {
//     response = await apiFunc.apply(this, [paramsAPI]);
//   }

//   if (!response) {
//     throw new Error('There is no response from server');
//   }

//   if (!isResponseOK(response, tid)) {
//     console.log('Response is not ok');
//     if (isTokenExpired(response)) {
//       console.log('Token is expired. Refresh it...');
//       const respRefresh = await refreshTokenAPI(paramsAPI);
//       if (!respRefresh) {
//         history.push('/login');
//       }

//       if (numOfTries > 1) {
//         return request(apiFunc, paramsAPI, numOfTries - 1);
//       }
//       return null;
//     }
//     if (isUnauthorized(response)) {
//       history.push('/login');

//       return null;
//     }
//     const {
//       data: { message },
//     } = response;
//     throw new Error(`Unexpected error: ${message}`);
//   }

//   return response;
// }

// admin requst ////

export async function requestAdmin(apiFunc, params, numOfTries = 2) {
  const tid = parseInt(Date.now() / 1000, 10);
  const tokenExpiration = parseInt(localStorage.getItem(TOKEN_EXPIRATION), 10);
  accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken && apiFunc !== loginAdminAPI) {
    history.push('/login');
    return null;
  }
  const paramsAPI = params || {};
  paramsAPI.tid = tid;
  paramsAPI.accessToken = accessToken;

  console.log('API Request:', numOfTries, params);

  let response = { data: { message: { code: responseErrors.TOKEN_EXPIRED } } };

  if (tid < tokenExpiration || apiFunc === loginAdminAPI) {
    response = await apiFunc.apply(this, [paramsAPI]);
  }

  if (!response) {
    return {
      error: true,
      code: errorCodes.NO_RESPONSE,
    };
    // throw new Error('There is no response from server');
  }

  if (!isResponseOK(response, tid)) {
    console.log('Response is not ok');
    if (isTokenExpired(response)) {
      console.log('Token is expired. Refresh it...');
      const respRefresh = await refreshTokenAPI(paramsAPI);
      if (!respRefresh) {
        history.push('/login');
      }

      if (numOfTries > 1) {
        return requestAdmin(apiFunc, paramsAPI, numOfTries - 1);
      }

      return {
        error: true,
        code: errorCodes.AUTHORIZATION_ERROR,
        message: '',
      };
    }

    if (isUnauthorized(response)) {
      history.push('/login');

      return {
        error: true,
        code: errorCodes.AUTHORIZATION_ERROR,
        message: '',
      };
    }
    const {
      data: { message },
    } = response;
    // throw new Error(`Unexpected error: ${message}`);
    return {
      error: true,
      code: errorCodes.UNEXPECTED_ERROR,
      message,
    };
  }

  return response;
}

async function genericRequest(data, params) {
  let genericResponse = null;

  const dataRequest = {
    type: 'rpc',
    action: params.action,
    method: params.method,
    tid: params.tid,
    data,
  };

  const config = {
    headers: getHeaders(),
  };

  // Do not path no-valid accessToken to any public methods
  // In other case the will fail!
  if (!isPublicMethod(params)) {
    console.log('Add auth token', params);
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete dataRequest.accessToken;
  }

  try {
    genericResponse = await axios.post(API_URL_ADMIN, dataRequest, config);
  } catch (error) {
    genericResponse = error.response;
    console.log('Generic Error:', genericResponse);
  }

  // add some delay before answer
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(genericResponse);
    }, 0);
  });
}

export async function refreshTokenAPI(params) {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken) {
    return null;
  }

  const genericParams = {
    ...params,
    action: 'auth',
    method: 'refresh',
  };

  const data = {
    refreshToken,
  };

  const response = await genericRequest(data, genericParams);

  if (isResponseOK(response, params.tid)) {
    const {
      data: { result },
    } = response;
    const { accessToken: accessTokenNew, refreshToken: refreshTokenNew, exp } = result;

    localStorage.setItem(ACCESS_TOKEN, accessTokenNew);
    localStorage.setItem(REFRESH_TOKEN, refreshTokenNew);
    localStorage.setItem(TOKEN_EXPIRATION, exp);

    console.log('Update accessToken & refreshToken to local storage');
    return response;
  }

  return null;
}

export async function loginUserAPI(params) {
  const genericParams = {
    ...params,
    action: 'auth',
    method: 'signin',
  };

  const data = {
    email: 'gerard.butler@example.com',
    password: '1',
  };

  const response = await genericRequest(data, genericParams);
  console.log('loginUserAPI', params, response);
  if (isResponseOK(response, params.tid)) {
    const {
      data: { result },
    } = response;
    const { accessToken: accessTokenResponse, refreshToken, exp } = result;
    accessToken = accessTokenResponse;

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_EXPIRATION, exp);

    console.log('Save accessToken & refreshToken to local storage');
  }

  return response;
}

export async function loginAdminAPI(params) {
  const genericParams = {
    ...params,
    action: 'auth',
    method: 'signin',
  };

  const data = {
    email: 'robert.downey.jn@example.com',
    password: '1',
  };

  console.log('data', data);

  const response = await genericRequest(data, genericParams);
  console.log('loginAdminAPI', params, response);
  if (isResponseOK(response, params.tid)) {
    const {
      data: { result },
    } = response;
    const { accessToken: accessTokenResponse, refreshToken, exp } = result;
    accessToken = accessTokenResponse;

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_EXPIRATION, exp);

    console.log('Save accessToken & refreshToken to local storage');
  }

  return response;
}

export async function sendMetersDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'sendMeters',
  };

  return genericRequest(params, genericParams);
}

export async function handleMetersDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'meters',
  };

  return genericRequest(params, genericParams);
}

export async function getPaymentsDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'payments',
  };
  const { page, limit, filter } = params;
  return genericRequest({ page, limit, filter }, genericParams);
}


export async function getBillsDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'bills',
  };
  let {page, limit, filter} = params;
  return genericRequest({page, limit, filter}, genericParams);
}

export async function getServiceValueDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'serviceValue',
    method: 'get',
  };
  let {id} = params;
  return genericRequest({id}, genericParams);
}

export async function updateServiceValueStatusAPI(params) {
  const genericParams = {
    ...params,
    action: 'serviceValue',
    method: 'updateStatus',
  };
  let {serviceValue} = params;
  return genericRequest({serviceValue: params.serviceValue}, genericParams);
}


export async function getOwnersDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'owners',
  };

  return genericRequest({}, genericParams);
}

export async function getBillTemplateForRealtyCardAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'realtyBillTemplate',
  };

  return genericRequest({id: params.id, events: params.events}, genericParams);
}

export async function getCreatedBillTemplateForRealtyCardAPI(params) {
  const genericParams = {
    ...params,
    action: 'serviceValue',
    method: 'realtyBillTemplate',
  };

  return genericRequest({id: params.id, events: params.events}, genericParams);
}

export async function saveBillForRealtyCardAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'saveRealtyBill',
  };

  return genericRequest({bill: params.bill}, genericParams);
}

export async function getRealtyCardDataAPI(params) {
  const genericParams = {
    ...params,
    action: 'operators',
    method: 'realtyCard',
  };

  return genericRequest({id: params.id, events: params.events}, genericParams);
}

export async function navigate(path) {
  history.push(path);
}