import { createSlice } from "@reduxjs/toolkit";

export const selectUser = (state) => state?.auth?.data?.user;


export const selectAccessToken = (state) => state?.auth?.data?.accessToken;

const initialState = {
  data: {
    user: null,
    accessToken: null,
  },
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.loading = action.payload;
    },
    loginSuccess(state, action) {
      state.data.user = action.payload.user;
      state.data.accessToken = action.payload.accessToken;
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure(state) {
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout() {
      return initialState;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
