// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer, // Add projectsReducer here
  },
});

export default store;
