
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    role: "Học sinh THPT",
    content: "Mình rất thích học trên EPU Documents! Các bài toán thú vị và đều rất thử thách. Mỗi lần hoàn thành một bài, mình cảm thấy tự tin hơn nhiều. EPU Documents giúp mình hiểu sâu hơn những gì học trên lớp.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Trần Quang Huy",
    role: "Học sinh THCS",
    content: "EPU Documents giúp mình học toán tiếng Anh cực kỳ vui! Những bài tập không chỉ giúp mình luyện ngôn ngữ mà còn rèn luyện tư duy logic. Mình có thể làm lại nhiều lần để cải thiện điểm số.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Trần Nguyễn Tuấn Khôi",
    role: "Học sinh THPT",
    content: "Vì đề thi của EPU Documents rất đa dạng, nên việc 'ôn tủ' là quyết định lớn nhất chính là học thật nhiều và làm thật nhiều đề khác nhau mới có thể thi EPU Documents đạt kết quả tốt.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "Lê Thị Mai",
    role: "Giáo viên THCS",
    content: "Tôi thường xuyên giới thiệu EPU Documents cho học sinh của mình. Nền tảng này cung cấp nội dung học tập chất lượng và phương pháp học tương tác hiệu quả, giúp học sinh tiến bộ rõ rệt.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 5
  },
  {
    id: 5,
    name: "Phạm Văn Đức",
    role: "Phụ huynh",
    content: "Con tôi đã cải thiện điểm số đáng kể sau khi sử dụng EPU Documents. Tôi đánh giá cao cách nền tảng này thiết kế bài học sinh động và hấp dẫn, khiến con tôi thích thú với việc học.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Phản hồi từ người dùng</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hàng ngàn học sinh, giáo viên và phụ huynh đã tin tưởng EPU Documents
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-50"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].content}"</p>
                
                <div>
                  <h4 className="font-display font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-12 w-10 h-10 rounded-full bg-white shadow-medium flex items-center justify-center text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-12 w-10 h-10 rounded-full bg-white shadow-medium flex items-center justify-center text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
