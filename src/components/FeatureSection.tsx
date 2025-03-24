
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, MessageSquare, FileText } from 'lucide-react';

const features = [
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    title: "Khóa học chất lượng",
    description: "Học tập với các khóa học được thiết kế bởi giáo viên giàu kinh nghiệm, bao gồm video bài giảng, tài liệu và bài kiểm tra."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    title: "Blog trao đổi",
    description: "Tham gia cộng đồng học tập, đặt câu hỏi, trao đổi kinh nghiệm và giải đáp thắc mắc cùng bạn bè và giáo viên."
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    title: "Kho tài liệu",
    description: "Truy cập kho tài liệu phong phú bao gồm sách, đề thi, bài tập và tài liệu tham khảo cho nhiều môn học khác nhau."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    title: "Bài kiểm tra",
    description: "Kiểm tra kiến thức với các bài kiểm tra trắc nghiệm được thiết kế phù hợp với từng cấp độ và môn học."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Tính năng nổi bật</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            EPU Documents cung cấp đa dạng tính năng giúp việc học tập trở nên hiệu quả và thú vị hơn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card-feature group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
