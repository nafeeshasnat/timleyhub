import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientName: '',
  projectName: '',
  projectTimeBudget: 0,
  isBillable: false,
  tasks: [{ name: '', budget: '', isBillable: false }],
  isRecurring: false,
}

export const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    updateFormValues: (state, action) => {
      return {...state, ...action.payload};
    },
    updateTask: (state, action) => {
      const { index, task } = action.payload;
      state.tasks[index] = {...state.tasks[index], ...task};
    },
    addTask: (state) => {
      state.tasks.push({ name: '', budget: '', isBillable: false });
    },
    removeTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
  },
});

export const { updateFormValues, updateTask, addTask, removeTask } = projectFormSlice.actions;

export default projectFormSlice.reducer;
