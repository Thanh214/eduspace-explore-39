
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-green to-brand-blue rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gray-900">EPU Documents</span>
            </Link>
            <p className="text-gray-600 mt-2 text-sm">
              Nền tảng học tập trực tuyến hàng đầu cho học sinh và sinh viên Việt Nam. Học mọi lúc, mọi nơi với các khóa học chất lượng.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Khám phá</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Tài liệu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Quy định</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Trợ giúp & Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">235 Hoàng Quốc Việt, Hà Nội, Việt Nam</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">contact@epudocuments.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} EPU Documents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
