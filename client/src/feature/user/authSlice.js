import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    page: "",
    uid: ""
  },
  reducers: {
    login: (state,action) => {
      state.isAuthenticated = true;
    },
    setUser: (state,action) => {
      state.uid = action.payload.uid
    },
    deleteUser: (state) => {
      state.uid = ''
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setPage: (state,action) => {
      state.page = action.payload.page
    }
  },
});

export const { login, logout, setPage, setUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
