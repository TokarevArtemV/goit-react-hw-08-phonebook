import axios from 'axios';
import {
  clearTokenContactsInstance,
  setTokenContactsInstance,
} from './posts-api';

export const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

const setToken = token =>
  (authInstance.defaults.headers.common.Authorization = `Bearer ${token}`);

const clearToken = () =>
  (authInstance.defaults.headers.common.Authorization = '');

export const apiRegisterUser = async userData => {
  const data = await authInstance.post('/users/signup', userData);
  setToken(data.data.token);
  setTokenContactsInstance(data.data.token);
  return data;
};

export const apiLoginUser = async userData => {
  const data = await authInstance.post('/users/login', userData);
  setToken(data.data.token);
  setTokenContactsInstance(data.data.token);
  return data;
};

export const apiRefreshUser = async token => {
  setToken(token);
  setTokenContactsInstance(token);
  const data = await authInstance.get('/users/current');
  return data;
};

export const apiLogOutUser = async () => {
  const data = await authInstance.post('/users/logout');
  clearToken();
  clearTokenContactsInstance();
  return data;
};
