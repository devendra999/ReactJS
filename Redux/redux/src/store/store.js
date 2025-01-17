// redux/store.js
import { createStore, combineReducers } from 'redux';

// Initial state for your app
const initialStateCount = {
  count: 0,
};

const initialStateUser = {
  user: null,
};

// Reducer for count
function counterReducer(state = initialStateCount, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

// Reducer for user information
function userReducer(state = initialStateUser, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Combine reducers
const rootReducer = combineReducers({
  count: counterReducer,
  user: userReducer,
});

// Create Redux store with the combined reducers
const store = createStore(rootReducer);

export default store;
