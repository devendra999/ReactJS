"use client"

// src/store/store.js

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '@/store/reducers'

const store = createStore(rootReducer, composeWithDevTools());

export default store;
