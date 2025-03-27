
// API base URL - Use relative URL instead of localhost
export const API_URL = '/api';

// Default headers for API requests
export const defaultHeaders = {
  'Content-Type': 'application/json'
};

// Authentication header for protected routes
export const authHeader = (token: string) => ({
  ...defaultHeaders,
  Authorization: `Bearer ${token}`
});

// Handle API response - Check for errors and parse JSON
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đã xảy ra lỗi');
    } catch (error) {
      // If cannot parse JSON, use status text
      throw new Error(response.statusText || 'Đã xảy ra lỗi');
    }
  }
  
  return await response.json();
};
