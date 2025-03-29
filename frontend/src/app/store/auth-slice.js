import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  accessToken: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = undefined;
      state.accessToken = undefined;
    }
  }
});

export const { setAccessToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
