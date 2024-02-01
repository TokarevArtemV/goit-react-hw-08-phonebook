import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  authLogOutUser,
  authLoginUser,
  authRefreshUser,
  authRegisterUser,
} from './authOperation';

const initialAuth = {
  userData: { name: null, number: null },
  token: null,
  isLoggedIn: null,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  extraReducers: builder =>
    builder
      //================ Register User ==============
      .addCase(authRegisterUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.userData = payload.user;
        state.token = payload.token;
      })
      //================ LogIn ==============
      .addCase(authLoginUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.userData = payload.user;
        state.token = payload.token;
      }) //================ Refresh User ==============
      .addCase(authRefreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.userData = action.payload;
      }) //================ LogOut ==============
      .addCase(authLogOutUser.fulfilled, state => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = false;
        state.token = null;
        state.userData = { name: null, number: null };
      })
      .addCase(authRefreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(authRegisterUser.pending, authLoginUser.pending),
        state => {
          state.error = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          authRegisterUser.rejected,
          authLoginUser.rejected,
          authRefreshUser.rejected
        ),
        (state, { payload }) => {
          state.isRefreshing = false;
          state.error = payload;
          state.isLoading = false;
        }
      ),
});

export const authReduser = authSlice.reducer;
