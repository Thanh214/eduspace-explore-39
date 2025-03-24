
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, User, MessageSquare, ThumbsUp, Tag, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Phương pháp học tập hiệu quả cho học sinh THPT",
    excerpt: "Khám phá các phương pháp học tập giúp nâng cao hiệu quả và kết quả học tập ở bậc THPT...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Nguyễn Thanh Tùng",
    date: "12/05/2023",
    readTime: "5 phút đọc",
    image: "/lovable-uploads/428998de-7ab2-4da3-a560-bc75a976d5af.png",
    tags: ["học tập", "thpt", "kỹ năng"],
    likes: 45,
    comments: 12,
    category: "Kỹ năng học tập"
  },
  {
    id: 2,
    title: "10 bí quyết ôn thi đại học môn Toán hiệu quả",
    excerpt: "Những bí quyết giúp bạn ôn tập và chuẩn bị tốt nhất cho kỳ thi đại học môn Toán...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Trần Minh Hiếu",
    date: "05/06/2023",
    readTime: "8 phút đọc",
    image: "/lovable-uploads/23067a8d-b301-4b0b-80d3-1735c26da8ce.png",
    tags: ["đại học", "thi cử", "toán học"],
    likes: 72,
    comments: 24,
    category: "Ôn thi đại học"
  },
  {
    id: 3,
    title: "Cách viết một bài văn nghị luận xuất sắc",
    excerpt: "Hướng dẫn chi tiết cách viết bài văn nghị luận với cấu trúc rõ ràng và lập luận thuyết phục...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Lê Thu Hương",
    date: "28/06/2023",
    readTime: "6 phút đọc",
    image: "/lovable-uploads/1768ad12-24d4-473b-9d8a-0e2514c39e42.png",
    tags: ["văn học", "kỹ năng viết", "nghị luận"],
    likes: 56,
    comments: 18,
    category: "Văn học"
  },
  {
    id: 4,
    title: "Lộ trình học tiếng Anh từ cơ bản đến nâng cao",
    excerpt: "Chia sẻ lộ trình học tiếng Anh hiệu quả từ người mới bắt đầu đến trình độ nâng cao...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Phạm Quang Minh",
    date: "15/07/2023",
    readTime: "7 phút đọc",
    image: "/placeholder.svg",
    tags: ["tiếng anh", "ngoại ngữ", "học tập"],
    likes: 89,
    comments: 32,
    category: "Ngoại ngữ"
  },
  {
    id: 5,
    title: "5 phương pháp ghi nhớ hiệu quả trong học tập",
    excerpt: "Khám phá các kỹ thuật ghi nhớ giúp bạn học tập hiệu quả và lưu trữ kiến thức dài lâu...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Vũ Thị Mai Anh",
    date: "10/08/2023",
    readTime: "5 phút đọc",
    image: "/placeholder.svg",
    tags: ["kỹ năng học tập", "ghi nhớ", "phương pháp"],
    likes: 63,
    comments: 15,
    category: "Kỹ năng học tập"
  },
  {
    id: 6,
    title: "Các phương pháp giải nhanh bài tập Vật lý",
    excerpt: "Chia sẻ những phương pháp giải nhanh các dạng bài tập Vật lý thường gặp trong chương trình THPT...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl. Sed euismod, nisl vel ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc vel nisl.",
    author: "Nguyễn Hoàng Nam",
    date: "22/08/2023",
    readTime: "9 phút đọc",
    image: "/placeholder.svg",
    tags: ["vật lý", "bài tập", "kỹ thuật giải"],
    likes: 41,
    comments: 9,
    category: "Khoa học tự nhiên"
  }
];

// Categories for filtering
const categories = [
  "Tất cả",
  "Kỹ năng học tập",
  "Ôn thi đại học",
  "Văn học",
  "Ngoại ngữ",
  "Khoa học tự nhiên"
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [showCategories, setShowCategories] = useState(false);

  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === "Tất cả" || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-display font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Blog EPU Documents
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Cập nhật những bài viết hữu ích về phương pháp học tập, chia sẻ kinh nghiệm và kiến thức
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
                  placeholder="Tìm kiếm bài viết..."
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
        
        {/* Blog List Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Bài viết mới nhất</h2>
              <p className="text-gray-600 mt-1">Tìm thấy {filteredPosts.length} bài viết</p>
            </div>
            
            <div className="mt-4 md:mt-0 relative">
              <Button
                variant="outline"
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center"
              >
                <Tag className="w-4 h-4 mr-2" />
                {selectedCategory}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </Button>
              
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10"
                >
                  <div className="py-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedCategory === category
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategories(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="inline-block px-2 py-1 bg-white/90 text-indigo-600 text-xs rounded-md font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <span className="flex items-center text-gray-500 text-sm">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                      
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/blog/${post.id}`}>Đọc tiếp</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <MessageSquare className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
              <p className="text-gray-600 mb-6">
                Không tìm thấy bài viết phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Tất cả");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  &laquo; Trước
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">
                  10
                </Button>
                <Button variant="outline" size="sm">
                  Sau &raquo;
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
