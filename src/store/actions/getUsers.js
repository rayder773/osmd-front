import types from '../types';

export default function getUsers() {
  return {
    type: types.ADD_USER,
    payload: 'Denys',
  };
}
