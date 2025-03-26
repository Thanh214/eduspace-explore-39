
// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Default headers
export const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Handle API responses
export const handleApiResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Đã xảy ra lỗi');
  }
  
  return data;
};

// Add auth token to request
export const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
