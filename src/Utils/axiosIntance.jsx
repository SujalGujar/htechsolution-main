// src/utils/axiosInstance.js
import axios from "axios";

// ✅ STEP 1 - create axios instance with base config
const axiosInstance = axios.create({
  baseURL: "/api",                              // all requests start with /api
  timeout: 10000,                               // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",         // always send JSON
  },
});

// ✅ STEP 2 - REQUEST INTERCEPTOR
// this runs BEFORE every request is sent
axiosInstance.interceptors.request.use(
  (config) => {
    // get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // if token exists, attach it to every request
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    // log every request in development
    console.log(`📤 REQUEST: ${config.method.toUpperCase()} ${config.url}`);

    return config; // ✅ must return config
  },
  (error) => {
    // request setup failed
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ STEP 3 - RESPONSE INTERCEPTOR
// this runs AFTER every response is received
axiosInstance.interceptors.response.use(
  (response) => {
    // ✅ success response (status 200-299)
    console.log(`📥 RESPONSE: ${response.status} ${response.config.url}`);
    return response; // must return response
  },
  (error) => {
    // ❌ error response (status 4xx or 5xx)
    const status = error.response?.status;
    const message = error.response?.data?.message;

    console.error(`❌ ERROR: ${status} - ${message}`);

    if (status === 401) {
      // token expired or invalid → logout and redirect
      console.warn("Token expired! Redirecting to login...");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    if (status === 403) {
      // logged in but no permission
      console.warn("Access denied!");
      alert("You dont have permission to access this!");
    }

    if (status === 404) {
      // route not found
      console.warn("Resource not found!");
    }

    if (status === 500) {
      // server crashed
      console.error("Server error!");
      alert("Server error! Please try again later.");
    }

    return Promise.reject(error); // ✅ must reject so catch() works
  }
);

export default axiosInstance;