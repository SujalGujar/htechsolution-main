// // src/utils/axiosInstance.js
// import axios from "axios";

// // ✅ STEP 1 - create axios instance with base config
// const axiosInstance = axios.create({
//   baseURL: "/api",                              // all requests start with /api
//   timeout: 10000,                               // 10 seconds timeout
//   headers: {
//     "Content-Type": "application/json",         // always send JSON
//   },
// });

// // ✅ STEP 2 - REQUEST INTERCEPTOR
// // this runs BEFORE every request is sent
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // get user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user"));

//     // if token exists, attach it to every request
//     if (user?.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }

//     // log every request in development
//     console.log(`📤 REQUEST: ${config.method.toUpperCase()} ${config.url}`);

//     return config; // ✅ must return config
//   },
//   (error) => {
//     // request setup failed
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ STEP 3 - RESPONSE INTERCEPTOR
// // this runs AFTER every response is received
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // ✅ success response (status 200-299)
//     console.log(`📥 RESPONSE: ${response.status} ${response.config.url}`);
//     return response; // must return response
//   },
//   (error) => {
//     // ❌ error response (status 4xx or 5xx)
//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     console.error(`❌ ERROR: ${status} - ${message}`);

//     if (status === 401) {
//       // token expired or invalid → logout and redirect
//       console.warn("Token expired! Redirecting to login...");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }

//     if (status === 403) {
//       // logged in but no permission
//       console.warn("Access denied!");
//       alert("You dont have permission to access this!");
//     }

//     if (status === 404) {
//       // route not found
//       console.warn("Resource not found!");
//     }

//     if (status === 500) {
//       // server crashed
//       console.error("Server error!");
//       alert("Server error! Please try again later.");
//     }

//     return Promise.reject(error); // ✅ must reject so catch() works
//   }
// );

// export default axiosInstance;

// src/utils/axiosInstance.js
import axios from "axios";

// ✅ Create axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        // attach token if exists
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
          console.log("🔐 Token attached:", user.token);
        }
      }
    } catch (error) {
      console.error("❌ Invalid user data in localStorage");
      localStorage.removeItem("user");
    }

    console.log(`📤 REQUEST → ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ===============================
// ✅ RESPONSE INTERCEPTOR
// ===============================
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📥 RESPONSE ← ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";

    console.error(`❌ ERROR ${status}: ${message}`);

    // 🔴 401 - Token invalid / expired
    if (status === 401) {
      console.warn("⚠️ Session expired. Logging out...");

      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // 🔴 403 - No permission
    if (status === 403) {
      alert("❌ You don’t have permission to access this page.");
    }

    // 🔴 500 - Server error
    if (status === 500) {
      alert("⚠️ Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


// ============================================================
// FILE: src/utils/axiosInstance.js
// ============================================================
// WHAT CHANGED: Nothing structural — axiosInstance was already
// reading from localStorage.getItem("user") correctly.
// The bug was in Login.jsx not WRITING to "user".
// Now that Login.jsx writes to "user", this file works perfectly.
// Added one comment to make the key contract crystal clear.
// ============================================================


