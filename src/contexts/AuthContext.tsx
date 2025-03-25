
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  avatar?: string; // Added avatar property as optional
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: User, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (updates: Partial<User>) => void; // Added method to update user profile
}

const defaultUser = {
  name: "Nguyễn Văn A",
  email: "example@gmail.com",
  phone: "0987654321",
  address: "Hà Nội, Việt Nam",
  dob: "01/01/2000",
  avatar: "https://github.com/shadcn.png", // Default avatar
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, we would validate with a backend
    // For now, we'll simulate a successful login
    const userData = defaultUser;
    
    // Save user to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Đăng nhập thành công!",
      description: "Bạn đã đăng nhập vào hệ thống.",
    });
  };

  const register = async (userData: User, password: string) => {
    // In a real app, we would send this to a backend
    // For now, we'll simulate a successful registration
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Đăng ký thành công!",
      description: "Tài khoản của bạn đã được tạo.",
    });
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân của bạn đã được cập nhật.",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      updateUserProfile 
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
