// import axios from 'axios';
// import {API_BASE_URL} from "../../constant/ServerUrl";

// export default axios.create({
//   baseURL: API_BASE_URL + "/api",
//   withCredentials: true,
//   headers: {

//     'Content-Type': 'application/json',
//   }
// });

import axios from 'axios';
import { API_BASE_URL } from "../../constant/ServerUrl";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL + "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token refresh logic
let isRefreshing = false;
let subscribers = [];

// Function to add subscribers
const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback) => {
  subscribers.push(callback);
};

// Axios response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, add the request to the subscribers
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the refresh token endpoint
        const response = await axiosInstance.post('/refresh'); // Adjust the endpoint as necessary
        const { token } = response.data; // Assuming the new token is returned in this format

        // Save the new token (e.g., to local storage)
        localStorage.setItem('token', token);

        // Update the Authorization header
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        onRefreshed(token);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;