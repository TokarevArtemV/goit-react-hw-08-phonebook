import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  authLogOutUser,
  authLoginUser,
  authRefreshUser,
  authRegisterUser,
} from './authOperation';
import {
  handleAuthPending,
  handleAuthRefreshUserPending,
  handleAuthRejected,
  handleFulfilledLogInUser,
  handleFulfilledLogOutUser,
  handleFulfilledRefreshUser,
  handleFulfilledRegisterUser,
} from './handleAuthFunctionReduser';

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
      .addCase(authRegisterUser.fulfilled, (state, { payload }) =>
        handleFulfilledRegisterUser(state, payload)
      )
      .addCase(authLoginUser.fulfilled, (state, { payload }) =>
        handleFulfilledLogInUser(state, payload)
      )
      .addCase(authRefreshUser.fulfilled, (state, { payload }) =>
        handleFulfilledRefreshUser(state, payload)
      )
      .addCase(authLogOutUser.fulfilled, state =>
        handleFulfilledLogOutUser(state)
      )
      .addCase(authRefreshUser.pending, state =>
        handleAuthRefreshUserPending(state)
      )
      .addMatcher(
        isAnyOf(
          authRegisterUser.pending,
          authLoginUser.pending,
          authLogOutUser.pending
        ),
        state => handleAuthPending(state)
      )
      .addMatcher(
        isAnyOf(
          authRegisterUser.rejected,
          authLoginUser.rejected,
          authRefreshUser.rejected,
          authLogOutUser.rejected
        ),
        (state, { payload }) => handleAuthRejected(state, payload)
      ),
});

export const authReduser = authSlice.reducer;
