import axios, {AxiosRequestConfig} from 'axios';
import {store} from '../redux/store/store';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers = {...config.headers, Authorization: `Bearer ${token}`};
    }
    return config;
  },
  error => Promise.reject(error),
);

export default apiClient;
