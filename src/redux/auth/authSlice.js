import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  apiLogOutUser,
  apiLoginUser,
  apiRefreshUser,
  apiRegisterUser,
} from 'services';

const initialAuth = {
  userData: { name: null, number: null },
  token: null,
  isLoggedIn: null,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

export const authRegisterUser = createAsyncThunk(
  'auth/authRegisterUser',
  async (userData, thunkApi) => {
    try {
      const { data } = await apiRegisterUser(userData);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authLoginUser = createAsyncThunk(
  'auth/authLoginUser',
  async (userData, thunkApi) => {
    try {
      const { data } = await apiLoginUser(userData);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authRefreshUser = createAsyncThunk(
  'auth/authRefreshUser',
  async (_, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      console.log(token);
      if (!token) return thunkApi.rejectWithValue('No valid token');
      const { data } = await apiRefreshUser(token);
      return data;
    } catch (error) {
      console.log(error.message);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authLogOutUser = createAsyncThunk(
  'auth/authLogOutUser',
  async (_, thunkApi) => {
    try {
      const { data } = await apiLogOutUser();
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  extraReducers: builder =>
    builder
      //================ Register User ==============
      .addCase(authRegisterUser.fulfilled, (state, { payload }) => {
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
      .addCase(authRefreshUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = true;
        console.log(payload);
        state.userData = payload;
      }) //================ LogIn ==============
      .addCase(authLogOutUser.fulfilled, state => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedIn = false;
        state.userData = { name: null, number: null };
        state.token = null;
      })
      .addMatcher(
        isAnyOf(
          authRegisterUser.pending,
          authLoginUser.pending,
          authRefreshUser.pending
        ),
        state => {
          state.isRefreshing = true;
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
