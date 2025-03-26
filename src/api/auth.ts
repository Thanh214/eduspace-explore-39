
import { API_URL, defaultHeaders, handleApiResponse } from './config';
import { toast } from 'sonner';

// User type definition
export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
  balance?: number;
  dob?: string; // Add the dob (date of birth) property
}

// Register a new user
export const register = async (userData: {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(userData),
    });

    const data = await handleApiResponse(response);
    
    // Store token and user data
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    
    return data.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng ký';
    toast.error(message);
    throw error;
  }
};

// Login user
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email, password }),
    });

    const data = await handleApiResponse(response);
    
    // Store token and user data
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    
    return data.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đăng nhập';
    toast.error(message);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleApiResponse(response);
    return data.data.user;
  } catch (error) {
    // Clear storage on auth error
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
