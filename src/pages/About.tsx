
import { motion } from "framer-motion";
import { Users, BookOpen, Award, MessageSquare, BookMarked, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  // Sample statistics data
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Học viên" },
    { icon: <BookOpen className="w-8 h-8" />, value: "200+", label: "Khóa học" },
    { icon: <Award className="w-8 h-8" />, value: "100+", label: "Giảng viên" },
    { icon: <MessageSquare className="w-8 h-8" />, value: "98%", label: "Đánh giá tích cực" }
  ];

  // Sample team members data
  const team = [
    {
      name: "TS. Nguyễn Văn A",
      role: "Giám đốc học thuật",
      image: "/placeholder.svg",
      description: "Tiến sĩ Toán học với hơn 15 năm kinh nghiệm giảng dạy."
    },
    {
      name: "ThS. Trần Thị B",
      role: "Trưởng phòng đào tạo",
      image: "/placeholder.svg",
      description: "Thạc sĩ Giáo dục với chuyên môn về phương pháp giảng dạy."
    },
    {
      name: "TS. Lê Văn C",
      role: "Chuyên gia nội dung",
      image: "/placeholder.svg",
      description: "Tiến sĩ Văn học với nhiều năm kinh nghiệm biên soạn giáo trình."
    },
    {
      name: "ThS. Phạm Thị D",
      role: "Quản lý chất lượng",
      image: "/placeholder.svg",
      description: "Thạc sĩ Quản lý giáo dục với chuyên môn về đảm bảo chất lượng."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 mix-blend-multiply" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Về EPU Documents
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Nâng cao chất lượng giáo dục thông qua công nghệ và đổi mới sáng tạo
              </p>
            </motion.div>
          </div>
          
          {/* Stats Section */}
          <div className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <div className="flex justify-center mb-4 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  EPU Documents được thành lập với sứ mệnh mang đến giáo dục chất lượng cao, 
                  dễ tiếp cận cho mọi học sinh, sinh viên tại Việt Nam.
                </p>
                <p>
                  Chúng tôi tin rằng công nghệ và đổi mới sáng tạo có thể giúp 
                  thay đổi cách thức học tập truyền thống, giúp việc học trở nên 
                  thú vị và hiệu quả hơn.
                </p>
                <p>
                  Với đội ngũ giảng viên giàu kinh nghiệm và nền tảng công nghệ 
                  hiện đại, chúng tôi cam kết mang đến trải nghiệm học tập tốt 
                  nhất cho người học.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link to="/courses">Khám phá khóa học</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <BookMarked className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chất lượng hàng đầu
                </h3>
                <p className="text-gray-600">
                  Tài liệu và bài giảng được biên soạn kỹ lưỡng bởi đội ngũ chuyên gia
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hỗ trợ tận tâm
                </h3>
                <p className="text-gray-600">
                  Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của học viên
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <GraduationCap className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Phương pháp tiên tiến
                </h3>
                <p className="text-gray-600">
                  Áp dụng các phương pháp giảng dạy hiện đại, tương tác cao
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <Award className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Chứng nhận uy tín
                </h3>
                <p className="text-gray-600">
                  Cấp chứng chỉ có giá trị sau khi hoàn thành khóa học
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  Giá trị cốt lõi
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Những giá trị định hướng mọi hoạt động của chúng tôi
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center bg-gray-50 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Chất lượng
                </h3>
                <p className="text-gray-600">
                  Cam kết cung cấp nội dung giáo dục chất lượng cao, 
                  được kiểm duyệt kỹ lưỡng bởi các chuyên gia
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center bg-gray-50 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Tận tâm
                </h3>
                <p className="text-gray-600">
                  Luôn đặt lợi ích của học viên lên hàng đầu, 
                  hỗ trợ nhiệt tình trong suốt quá trình học tập
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center bg-gray-50 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Đổi mới
                </h3>
                <p className="text-gray-600">
                  Không ngừng cải tiến và áp dụng công nghệ mới 
                  để nâng cao trải nghiệm học tập
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Đội ngũ chuyên gia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những người thầy, cô giàu kinh nghiệm và tâm huyết
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-display font-bold mb-8">
                Sẵn sàng bắt đầu hành trình học tập?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Tham gia cộng đồng học tập của EPU Documents ngay hôm nay để trải nghiệm
                phương pháp học tập hiện đại và hiệu quả
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/courses">Khám phá khóa học</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="/contact">Liên hệ tư vấn</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
