
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const courses = [];

const CourseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Khóa học nổi bật</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Tìm hiểu và đăng ký các khóa học chất lượng từ EPU Documents
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-hard transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-sm text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="#FACC15" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-display font-semibold text-gray-900">{course.title}</h3>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium">
                      {course.level}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div>{course.lessons} bài học</div>
                    <div>{course.duration}</div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Khóa học bao gồm:</h4>
                    <ul className="space-y-1">
                      {course.features && course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>Xem chi tiết</Link>
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
              <div className="text-gray-500">Chưa có khóa học nào được thêm vào.</div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/courses">Xem tất cả khóa học</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
