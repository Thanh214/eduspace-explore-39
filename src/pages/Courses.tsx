
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Filter, Star, Search, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Toán học",
    description: "Khám phá toán học từ cơ bản đến nâng cao với phương pháp giải bài tập hiệu quả.",
    level: "Lớp 6-12",
    lessons: 42,
    duration: "36 giờ",
    rating: 4.9,
    image: "/lovable-uploads/428998de-7ab2-4da3-a560-bc75a976d5af.png",
    features: ["Video bài giảng", "Bài tập tương tác", "Kiểm tra đánh giá", "Hỗ trợ 24/7"],
    categories: ["toán học", "đại số", "hình học"],
  },
  {
    id: 2,
    title: "Tiếng Anh",
    description: "Nâng cao kỹ năng ngôn ngữ với các bài học phong phú và phương pháp học hiệu quả.",
    level: "Lớp 6-12",
    lessons: 36,
    duration: "30 giờ",
    rating: 4.8,
    image: "/lovable-uploads/23067a8d-b301-4b0b-80d3-1735c26da8ce.png",
    features: ["Luyện nghe, nói, đọc, viết", "Ngữ pháp và từ vựng", "Bài kiểm tra", "Phát âm chuẩn"],
    categories: ["tiếng anh", "ngoại ngữ", "giao tiếp"],
  },
  {
    id: 3,
    title: "Văn học",
    description: "Tìm hiểu các tác phẩm văn học với phân tích sâu sắc và kỹ thuật làm bài hiệu quả.",
    level: "Lớp 6-12",
    lessons: 32,
    duration: "28 giờ",
    rating: 4.7,
    image: "/lovable-uploads/1768ad12-24d4-473b-9d8a-0e2514c39e42.png",
    features: ["Phân tích tác phẩm", "Kỹ thuật làm văn", "Bài mẫu chất lượng", "Luyện viết văn"],
    categories: ["văn học", "ngữ văn", "tác phẩm"],
  },
  {
    id: 4,
    title: "Vật lý",
    description: "Học vật lý qua các thí nghiệm trực quan và bài tập thực tế hấp dẫn.",
    level: "Lớp 10-12",
    lessons: 38,
    duration: "32 giờ",
    rating: 4.8,
    image: "/placeholder.svg",
    features: ["Bài giảng minh họa", "Thí nghiệm ảo", "Bài tập thực hành", "Giải đề thi"],
    categories: ["vật lý", "khoa học tự nhiên"],
  },
  {
    id: 5,
    title: "Hóa học",
    description: "Khám phá thế giới hóa học qua các bài học sinh động và thực hành thí nghiệm.",
    level: "Lớp 10-12",
    lessons: 35,
    duration: "30 giờ",
    rating: 4.7,
    image: "/placeholder.svg",
    features: ["Bài giảng trực quan", "Thí nghiệm ảo", "Tài liệu chuyên sâu", "Đề thi thử"],
    categories: ["hóa học", "khoa học tự nhiên"],
  },
  {
    id: 6,
    title: "Sinh học",
    description: "Tìm hiểu về sự sống qua các bài học hấp dẫn và dễ hiểu với hình ảnh minh họa.",
    level: "Lớp 10-12",
    lessons: 30,
    duration: "26 giờ",
    rating: 4.6,
    image: "/placeholder.svg",
    features: ["Hình ảnh 3D", "Video minh họa", "Thí nghiệm mô phỏng", "Giải đề thi"],
    categories: ["sinh học", "khoa học tự nhiên"],
  }
];

// Categories for filtering
const categories = [
  "Tất cả",
  "Toán học",
  "Tiếng Anh",
  "Văn học",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Khoa học tự nhiên"
];

// Education levels for filtering
const levels = ["Tất cả", "Lớp 6-9", "Lớp 10-12"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedLevel, setSelectedLevel] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search, category, and level
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "Tất cả" || 
      course.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesLevel = 
      selectedLevel === "Tất cả" || 
      course.level.includes(selectedLevel.replace("Lớp ", ""));
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-display font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Khóa học chất lượng cao
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nâng cao kiến thức và kỹ năng với các khóa học được thiết kế bởi giáo viên giàu kinh nghiệm
              </motion.p>
            </div>
            
            <motion.div 
              className="mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative bg-white rounded-full shadow-md flex items-center p-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  className="border-none focus-visible:ring-0 pl-10 rounded-full py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="rounded-full">
                  Tìm kiếm
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Courses List Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Danh sách khóa học</h2>
              <p className="text-gray-600 mt-1">Tìm thấy {filteredCourses.length} khóa học</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Danh mục</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="rounded-full text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Cấp độ</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="rounded-full text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Sắp xếp theo</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        defaultChecked
                        className="rounded-full text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Phổ biến nhất</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        className="rounded-full text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Mới nhất</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        className="rounded-full text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Đánh giá cao nhất</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("Tất cả");
                    setSelectedLevel("Tất cả");
                  }}
                >
                  Đặt lại
                </Button>
                <Button onClick={() => setShowFilters(false)}>
                  Áp dụng
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
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
                        {course.features.map((feature, idx) => (
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
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
              <p className="text-gray-600 mb-6">
                Không tìm thấy khóa học phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Tất cả");
                  setSelectedLevel("Tất cả");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
