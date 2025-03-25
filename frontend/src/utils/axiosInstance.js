import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Flag to prevent multiple token refresh requests
let isRefreshing = false;
let failedRequestsQueue = [];

// Function to Refresh Token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.error("No refresh token available. Logging out...");
    logoutUser();
    return Promise.reject("No refresh token available");
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);
    axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token. Logging out...");
    logoutUser();
    return Promise.reject(error);
  }
};

// Function to Log Out User
const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login"; // Redirect to login page
};

// Response Interceptor: Handle Token Expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the response error is due to an expired token
    if (
      error.response?.status === 401 ||
      error.response?.data?.code === "token_not_valid"
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const newAccessToken = await refreshAccessToken();

          // Retry all queued requests
          failedRequestsQueue.forEach((req) => req.resolve(newAccessToken));
          failedRequestsQueue = [];

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          failedRequestsQueue.forEach((req) => req.reject(err));
          failedRequestsQueue = [];
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
