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
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        
        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            avatar: userData.avatar,
            balance: userData.balance
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
      
      if (data && data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          address: data.user.address,
          avatar: data.user.avatar,
          balance: data.user.balance
        });
        
        toast.success('Đăng nhập thành công!');
        navigate('/');
      } else {
        throw new Error('Không nhận được dữ liệu người dùng');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Đăng nhập thất bại');
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
      
      if (data && data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          address: data.user.address,
          avatar: data.user.avatar,
          balance: data.user.balance
        });
        
        toast.success('Đăng ký thành công!');
        navigate('/');
        return data;
      } else {
        throw new Error('Không nhận được dữ liệu người dùng');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error instanceof Error ? error.message : 'Đăng ký thất bại');
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

  const contextValue = {
    user, 
    isAuthenticated: !!user, 
    login, 
    register, 
    logout,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
