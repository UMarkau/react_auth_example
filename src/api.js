import axios from 'axios';
import {getRefreshTokenFromLS} from './localStorageUtils';

const instance = axios.create({
  baseURL: 'https://google.com', // Your base url
});

instance.interceptors.response.use(undefined, (error) => {
  const {response = {}, config = {}} = error;
  const {isRetryRequest, url} = config;
  if (response.status === 401 && !isRetryRequest && url !== '/login') {
    const refreshToken = getRefreshTokenFromLS();
    if (refreshToken) {
      config.isRetryRequest = true;
      return RefreshToken(refreshToken).then((response) => {
        const {
          data: {access_token},
        } = response;
        SetAuthenticationHeader(access_token);
        config.headers['Authorization'] = `Bearer ${access_token}`;
        return instance.request(config);
      });
    }
    return Promise.reject(error.response?.data?.msg || '');
  }
  return Promise.reject(error.response?.data?.msg || '');
});

export const SetAuthenticationHeader = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Payload depends on the server's refresh token logic. Here we are sending a header, that contains a refresh token.
export const RefreshToken = (refreshToken) =>
  instance.post(`/refresh`, {}, {headers: {Authorization: `Bearer ${refreshToken}`}});

export const API = {
  logIn: (username, password) => instance.post(`/login`, {username, password}),
  getProfiles: () => instance.get(`/profiles`),
  getProfile: (profileId) => instance.get(`/profile/${profileId}`),
  getSubscriptions: () => instance.get(`/subscriptions`),
};
