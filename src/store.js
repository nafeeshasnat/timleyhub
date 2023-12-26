// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

// Projects Reducer
const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PROJECTS_LIST:
      // Ensure that we're returning the new state and not undefined
      if (action.payload) {
        return action.payload;
      }
      return state; // Return the current state if payload is undefined
    default:
      return state;
  }
};

// Action Types
export const UPDATE_PROJECTS_LIST = 'UPDATE_PROJECTS_LIST';

// Action Creator
export const updateProjectsList = (projects) => ({
  type: UPDATE_PROJECTS_LIST,
  payload: projects,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer, // Add projectsReducer here
  },
});

export default store;
