import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLogOutUser,
  apiLoginUser,
  apiRefreshUser,
  apiRegisterUser,
} from 'services';

export const authRegisterUser = createAsyncThunk(
  'auth/authRegisterUser',
  async (userData, thunkApi) => {
    try {
      const { data } = await apiRegisterUser(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
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
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authRefreshUser = createAsyncThunk(
  'auth/authRefreshUser',
  async (_, thunkApi) => {
    try {
      const { token } = thunkApi.getState().auth;
      if (!token) return thunkApi.rejectWithValue('No valid token');
      const { data } = await apiRefreshUser(token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
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
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
