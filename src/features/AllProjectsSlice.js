import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [], // Initialize projects within an object
  updated : false
};

export const AllProjectsSlice = createSlice({
  name : 'allProjects',
  initialState,
  reducers : {
    projectsStorage: (state, action) => {
      state.projects = action.payload; // Directly assign the payload to projects
    },
    projectUpdate: (state, action) => {
      state.updated = action.payload;
    }
  }
});

export const { projectsStorage, projectUpdate } = AllProjectsSlice.actions;
export default AllProjectsSlice.reducer;