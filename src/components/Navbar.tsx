
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Book, BookOpen, Users, ShoppingBag, LogIn, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-brand-green to-brand-blue rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-display font-bold text-gray-900">EPU Documents</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/courses" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md transition-colors">
              Khóa học
            </Link>
            <Link to="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md transition-colors">
              Blog
            </Link>
            <Link to="/documents" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md transition-colors">
              Tài liệu
            </Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md transition-colors">
              Giới thiệu
            </Link>
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/profile" className="flex items-center space-x-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>{user?.name || "Tài khoản"}</span>
                  </Link>
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/register">Đăng ký</Link>
                </Button>
                <Button asChild>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Khóa học
            </Link>
            <Link 
              to="/blog" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/documents" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Tài liệu
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Giới thiệu
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {isAuthenticated ? (
                <div className="flex-shrink-0 w-full space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/profile" className="flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-1" />
                      <span>Tài khoản</span>
                    </Link>
                  </Button>
                  <Button variant="secondary" onClick={handleLogout} className="w-full">
                    <LogOut className="w-4 h-4 mr-1" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <div className="flex-shrink-0 w-full space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Đăng ký</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
