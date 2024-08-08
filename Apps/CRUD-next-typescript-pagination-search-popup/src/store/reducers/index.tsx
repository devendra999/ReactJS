// src/store/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from '@/store/reducers/userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  // Add more reducers as needed
});

export default rootReducer;
