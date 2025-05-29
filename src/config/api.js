// API configuration for different environments
export const API_CONFIG = {
  // Use environment variable if available, otherwise use default
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Check if we're in production (Netlify)
  isProduction: import.meta.env.PROD,
  
  // API endpoints
  endpoints: {
    chat: '/api/chat'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
};