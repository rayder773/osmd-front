export default function users(state = [], action) {
  if (action.type === 'ADD_USER') {
    return [...state, action.payload];
  }
  return state;
}
