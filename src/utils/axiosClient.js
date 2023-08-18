// axiosClient.js
import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./LocalStorageManager";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor to handle outgoing requests.
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle incoming responses.
axiosClient.interceptors.response.use(
  (response) => {
    // Get the response data from the response object.
    const { data } = response;

    // If the response status is "ok," return the data as it is.
    if (data.status === "ok") {
      return data;
    }

    // If the response status code is 401 (unauthorized) and the original request URL is the token refresh endpoint,
    // remove the access token from local storage, redirect the user to the login page, and reject the promise with the error.
    const originalRequest = response.config;
    const { statusCode } = data.statusCode;
    const { error } = data.message;


    // If the response status code is 401 (unauthorized) and this is not a retry,
    // initiate a token refresh request and retry the original request after getting a new access token.
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`, {
          withCredentials: true,
        })
        .then((refreshResponse) => {
          if (
            refreshResponse.data.status === "ok" &&
            refreshResponse.data.result.accessToken
          ) {
            // If the token refresh is successful, update the access token in local storage and the request header,
            // then retry the original request with the new access token.
            setItem(KEY_ACCESS_TOKEN, refreshResponse.data.result.accessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshResponse.data.result.accessToken}`;
            return axiosClient(originalRequest);
          } else {
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/login");
            return Promise.reject(error);
          }
        })
        .catch((refreshError) => {
          // If the token refresh request fails, handle the error and reject the promise with the original error.
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(error);
        });
    }
    // If none of the above conditions are met, reject the promise with the error from the response.
    return Promise.reject(error);
  },
  async (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
