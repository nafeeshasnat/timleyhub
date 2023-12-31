// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import formDataReducer from './features/projectFormSlice';
import AllProjectsSlice from './features/AllProjectsSlice';
import collaboratorsReducer from './features/collaboratorsReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    projectForm: formDataReducer,
    allProjects: AllProjectsSlice,
    collaborators: collaboratorsReducer
  },
});

export default store;