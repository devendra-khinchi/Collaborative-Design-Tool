import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  timeout: 20000, // 20 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from Redux store
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request sent:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log("Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response?.status, error.message);

    // Handle different error status codes
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Token expired or invalid
          console.log("Unauthorized access - logging out user");
          // Optionally redirect to login
          window.location.href = "/";
          break;

        case 403:
          // Forbidden - User doesn't have permission
          console.log("Access forbidden");
          break;

        case 404:
          // Not found
          console.log("Resource not found");
          break;

        case 500:
          // Server error
          console.log("Server error");
          break;

        default:
          console.log("API error:", status);
      }
    } else if (error.request) {
      // Network error
      console.log("Network error - no response received");
    } else {
      // Something else happened
      console.log("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
