
import axios from "axios";

// ✅ Create axios instanceconst baseURL = import.meta.env.VITE_API_URL || "https://htechsolution-main.onrender.com";
// const baseURL = import.meta.env.VITE_API_URL || "https://htechsolution-main.onrender.com";

const axiosInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL}/api`,
  
      // baseURL: "https://htechsolution-main.onrender.com/api"|| "http://localhost:5000",
      baseURL:"http://localhost:5000/api",


  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(import.meta.env.VITE_API_URL)


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



