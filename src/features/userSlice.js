// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userDetails = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    logout: (state) => {
      state.userDetails = null;
      state.isSuccess = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
