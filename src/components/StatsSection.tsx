
import { motion } from 'framer-motion';
import { Users, Book, Award } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    value: "43k+",
    label: "Học sinh tham gia",
    description: "Cộng đồng học tập đang phát triển mỗi ngày"
  },
  {
    icon: <Book className="w-8 h-8 text-blue-500" />,
    value: "500+",
    label: "Khóa học & tài liệu",
    description: "Nội dung học tập đa dạng cho mọi môn học"
  },
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    value: "95%",
    label: "Tỷ lệ hài lòng",
    description: "Người dùng đánh giá cao chất lượng nội dung"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-soft p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-lg font-medium text-gray-800 mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
