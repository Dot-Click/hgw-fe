import axios from 'axios';

/**
 * CENTRALIZED AXIOS INSTANCE
 * 
 * This instance is configured with the base URL and standard headers.
 * It simplifies API calls across Redux slices and components.
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message extraction
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(message);
  }
);

export default api;
