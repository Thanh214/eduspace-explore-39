
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              Sẵn sàng bắt đầu hành trình học tập cùng EPU Documents?
            </h2>
            <p className="mt-4 text-blue-50 text-lg">
              Đăng ký ngay hôm nay để tiếp cận kho tài nguyên học tập phong phú và cộng đồng hỗ trợ tận tình.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register" className="flex items-center">
                  <span>Đăng ký miễn phí</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link to="/courses">Xem khóa học</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
              <div className="w-72 h-72 md:w-96 md:h-96 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 relative">
                <div className="space-y-4">
                  <div className="w-full h-8 bg-white/10 rounded-md animate-pulse" />
                  <div className="w-3/4 h-8 bg-white/10 rounded-md animate-pulse" />
                  <div className="w-full h-40 bg-white/10 rounded-lg animate-pulse mt-6" />
                  <div className="w-full h-8 bg-white/10 rounded-md animate-pulse" />
                  <div className="w-1/2 h-8 bg-white/10 rounded-md animate-pulse" />
                  <div className="flex justify-center mt-6">
                    <div className="w-40 h-10 bg-white/20 rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
