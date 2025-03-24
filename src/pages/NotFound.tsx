
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex items-center justify-center"
      >
        <div className="max-w-lg mx-auto px-4 py-12 text-center">
          <h1 className="text-9xl font-display font-bold text-blue-500 mb-2">404</h1>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Trang không tìm thấy</h2>
          <p className="text-gray-600 mb-8">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Trang này có thể đã bị di chuyển, xóa hoặc chưa tồn tại.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Về trang chủ</span>
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Quay lại</span>
            </Button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default NotFound;
