
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as authApi from '@/api/auth';

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string;
  balance?: number;
  dob?: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
  dob?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for saved token and user data on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        
        if (userData) {
          setUser({
            id: userData.ID,
            email: userData.email,
            name: userData.full_name,
            phone: userData.phone,
            address: userData.address,
            avatar: userData.avatar_url,
            balance: userData.balance,
            dob: userData.dob
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        phone: data.user.phone,
        address: data.user.address,
        avatar: data.user.avatar,
        balance: data.user.balance,
        dob: data.user.dob
      });
      
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      console.log('Register with data:', userData);
      const data = await authApi.register(userData);
      
      setUser({
        id: data.user.ID,
        email: data.user.email,
        name: data.user.full_name,
        phone: data.user.phone,
        address: data.user.address,
        avatar: data.user.avatar_url,
        balance: data.user.balance,
        dob: data.user.dob
      });
      
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Cập nhật thành công');
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    navigate('/');
    
    toast.success('Đăng xuất thành công');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      updateUserProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
