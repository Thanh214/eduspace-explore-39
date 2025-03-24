
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, BookOpen, MessageSquare, FileText } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-8 md:pt-12 pb-16 md:pb-24">
      {/* Decoration dots */}
      <div className="absolute inset-0 decoration-dots opacity-60" />
      
      {/* Floating blobs */}
      <motion.div 
        className="absolute top-20 right-[10%] w-24 h-24 rounded-full bg-blue-100/40 blur-2xl"
        variants={decorationVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <motion.div 
        className="absolute bottom-20 left-[5%] w-32 h-32 rounded-full bg-green-100/30 blur-2xl"
        variants={decorationVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <motion.div 
        className="absolute top-40 left-[15%] w-12 h-12 rounded-full bg-yellow-100/50 blur-xl"
        variants={decorationVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight max-w-4xl"
            variants={itemVariants}
          >
            Được yêu thích bởi học sinh, nhà trường và thầy cô!
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl"
            variants={itemVariants}
          >
            EPU Documents giúp bạn học tập hiệu quả với các khóa học chất lượng, cộng đồng hỗ trợ và tài liệu phong phú cho mọi môn học.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Button size="lg" asChild>
              <Link to="/courses" className="flex items-center">
                <span>Khám phá khóa học</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">Đăng ký ngay</Link>
            </Button>
          </motion.div>
          
          {/* Trusted by */}
          <motion.div 
            className="mt-16 w-full"
            variants={itemVariants}
          >
            <div className="text-sm text-gray-500 mb-6 font-medium">ĐƯỢC TIN DÙNG BỞI</div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-soft flex items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-200 rounded-full opacity-70 animate-pulse-slow"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
