// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import formDataReducer from './features/projectFormSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projectForm: formDataReducer
  },
});

export default store;