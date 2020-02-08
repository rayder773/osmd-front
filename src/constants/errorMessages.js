export const errorCodes = {
  NO_RESPONSE: 'NO_RESPONSE',
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  REFRESH_TOKEN_ERROR: 'REFRESH_TOKEN_ERROR',
};

const { NO_RESPONSE, UNEXPECTED_ERROR, AUTHORIZATION_ERROR, REFRESH_TOKEN_ERROR } = errorCodes;

export const errorMessages = {
  [NO_RESPONSE]: 'There is no response from server.',
  [UNEXPECTED_ERROR]: 'Unexpected error.',
  [AUTHORIZATION_ERROR]: 'Authorization error.',
  [REFRESH_TOKEN_ERROR]: 'Cannot refresh token',
};
