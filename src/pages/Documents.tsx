
import { useState } from "react";
import { motion } from "framer-motion";
import { File, FileText, Download, Search, Filter, Bookmark, Eye, ChevronDown, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample documents data
const documentsData = [
  {
    id: 1,
    title: "Đề thi thử THPT Quốc Gia môn Toán năm 2023",
    description: "Bộ đề thi thử THPT Quốc Gia môn Toán có đáp án và lời giải chi tiết.",
    type: "Đề thi",
    subject: "Toán học",
    grade: "Lớp 12",
    date: "15/06/2023",
    views: 2450,
    downloads: 1280,
    fileSize: "2.3 MB",
    fileType: "PDF"
  },
  {
    id: 2,
    title: "Sách bài tập Tiếng Anh lớp 11",
    description: "Sách bài tập Tiếng Anh lớp 11 bổ trợ chương trình học chuẩn.",
    type: "Sách",
    subject: "Tiếng Anh",
    grade: "Lớp 11",
    date: "10/05/2023",
    views: 1850,
    downloads: 950,
    fileSize: "15.6 MB",
    fileType: "PDF"
  },
  {
    id: 3,
    title: "Ngữ văn 12 - Phân tích tác phẩm Truyện Kiều",
    description: "Tài liệu phân tích chi tiết tác phẩm Truyện Kiều của Nguyễn Du.",
    type: "Tài liệu",
    subject: "Văn học",
    grade: "Lớp 12",
    date: "20/05/2023",
    views: 3200,
    downloads: 1560,
    fileSize: "1.8 MB",
    fileType: "PDF"
  },
  {
    id: 4,
    title: "Bộ sưu tập bài tập Vật lý chọn lọc lớp 12",
    description: "Tổng hợp các bài tập Vật lý khó và hay có lời giải chi tiết.",
    type: "Bài tập",
    subject: "Vật lý",
    grade: "Lớp 12",
    date: "05/06/2023",
    views: 1750,
    downloads: 820,
    fileSize: "3.5 MB",
    fileType: "PDF"
  },
  {
    id: 5,
    title: "Hóa học 11 - Chuyên đề Hóa hữu cơ",
    description: "Tài liệu tổng hợp kiến thức và bài tập về Hóa hữu cơ lớp 11.",
    type: "Chuyên đề",
    subject: "Hóa học",
    grade: "Lớp 11",
    date: "12/06/2023",
    views: 1350,
    downloads: 680,
    fileSize: "2.7 MB",
    fileType: "PDF"
  },
  {
    id: 6,
    title: "Sinh học 12 - Ôn tập di truyền học",
    description: "Tổng hợp lý thuyết và bài tập di truyền học chuẩn bị cho kỳ thi THPT Quốc Gia.",
    type: "Ôn tập",
    subject: "Sinh học",
    grade: "Lớp 12",
    date: "18/06/2023",
    views: 1620,
    downloads: 790,
    fileSize: "4.1 MB",
    fileType: "PDF"
  },
  {
    id: 7,
    title: "Bài giảng Lịch sử Việt Nam 1945-1975",
    description: "Bài giảng chi tiết về lịch sử Việt Nam giai đoạn 1945-1975.",
    type: "Bài giảng",
    subject: "Lịch sử",
    grade: "Lớp 12",
    date: "08/06/2023",
    views: 1480,
    downloads: 720,
    fileSize: "5.2 MB",
    fileType: "PDF"
  },
  {
    id: 8,
    title: "Địa lý 11 - Địa lý tự nhiên Việt Nam",
    description: "Tài liệu tổng hợp về địa lý tự nhiên Việt Nam dành cho học sinh lớp 11.",
    type: "Tài liệu",
    subject: "Địa lý",
    grade: "Lớp 11",
    date: "25/05/2023",
    views: 1280,
    downloads: 610,
    fileSize: "3.8 MB",
    fileType: "PDF"
  }
];

// Filter options
const subjects = ["Tất cả", "Toán học", "Tiếng Anh", "Văn học", "Vật lý", "Hóa học", "Sinh học", "Lịch sử", "Địa lý"];
const grades = ["Tất cả", "Lớp 10", "Lớp 11", "Lớp 12"];
const types = ["Tất cả", "Đề thi", "Sách", "Tài liệu", "Bài tập", "Chuyên đề", "Ôn tập", "Bài giảng"];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tất cả");
  const [selectedGrade, setSelectedGrade] = useState("Tất cả");
  const [selectedType, setSelectedType] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // Filter documents based on search, subject, grade, and type
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === "Tất cả" || doc.subject === selectedSubject;
    const matchesGrade = selectedGrade === "Tất cả" || doc.grade === selectedGrade;
    const matchesType = selectedType === "Tất cả" || doc.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesGrade && matchesType;
  });

  // Helper function to convert date string to Date object
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Sort documents based on sort option
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      case "oldest":
        return parseDate(a.date).getTime() - parseDate(b.date).getTime();
      case "most_viewed":
        return b.views - a.views;
      case "most_downloaded":
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  // Get document icon based on document type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Đề thi":
        return <File className="w-8 h-8 text-red-500" />;
      case "Sách":
        return <FileText className="w-8 h-8 text-blue-500" />;
      case "Tài liệu":
        return <FileText className="w-8 h-8 text-green-500" />;
      case "Bài tập":
        return <File className="w-8 h-8 text-purple-500" />;
      case "Chuyên đề":
        return <FileText className="w-8 h-8 text-orange-500" />;
      case "Ôn tập":
        return <FileText className="w-8 h-8 text-teal-500" />;
      case "Bài giảng":
        return <FileText className="w-8 h-8 text-indigo-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-display font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Tài liệu học tập
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg md:text-xl text-teal-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Kho tài liệu học tập phong phú với hơn 10,000 tài liệu chất lượng từ nhiều môn học khác nhau
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
                  placeholder="Tìm kiếm tài liệu..."
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
        
        {/* Documents List Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">Thư viện tài liệu</h2>
              <p className="text-gray-600 mt-1">Tìm thấy {filteredDocuments.length} tài liệu</p>
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
              
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => {
                    const menu = document.getElementById("sort-menu");
                    if (menu) {
                      menu.classList.toggle("hidden");
                    }
                  }}
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sắp xếp
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                
                <div
                  id="sort-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 hidden"
                >
                  <div className="py-1">
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortOption === "newest" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortOption("newest");
                        document.getElementById("sort-menu")?.classList.add("hidden");
                      }}
                    >
                      Mới nhất
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortOption === "oldest" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortOption("oldest");
                        document.getElementById("sort-menu")?.classList.add("hidden");
                      }}
                    >
                      Cũ nhất
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortOption === "most_viewed" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortOption("most_viewed");
                        document.getElementById("sort-menu")?.classList.add("hidden");
                      }}
                    >
                      Xem nhiều nhất
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        sortOption === "most_downloaded" ? "bg-teal-50 text-teal-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortOption("most_downloaded");
                        document.getElementById("sort-menu")?.classList.add("hidden");
                      }}
                    >
                      Tải nhiều nhất
                    </button>
                  </div>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Môn học</h3>
                  <div className="space-y-2">
                    {subjects.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="subject"
                          checked={selectedSubject === subject}
                          onChange={() => setSelectedSubject(subject)}
                          className="rounded-full text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Lớp</h3>
                  <div className="space-y-2">
                    {grades.map((grade) => (
                      <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="grade"
                          checked={selectedGrade === grade}
                          onChange={() => setSelectedGrade(grade)}
                          className="rounded-full text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{grade}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 text-gray-900">Loại tài liệu</h3>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(type)}
                          className="rounded-full text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-gray-700">{type}</span>
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
                        checked={sortOption === "newest"}
                        onChange={() => setSortOption("newest")}
                        className="rounded-full text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-gray-700">Mới nhất</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        checked={sortOption === "most_viewed"}
                        onChange={() => setSortOption("most_viewed")}
                        className="rounded-full text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-gray-700">Xem nhiều nhất</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        checked={sortOption === "most_downloaded"}
                        onChange={() => setSortOption("most_downloaded")}
                        className="rounded-full text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-gray-700">Tải nhiều nhất</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubject("Tất cả");
                    setSelectedGrade("Tất cả");
                    setSelectedType("Tất cả");
                    setSortOption("newest");
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
          
          {/* Documents List */}
          {sortedDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      {getDocumentIcon(doc.type)}
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-display font-semibold text-gray-900 line-clamp-2">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                        {doc.subject}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                        {doc.grade}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700">
                        {doc.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {doc.views}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {doc.downloads}
                      </div>
                      <div>{doc.fileSize}</div>
                      <div className="text-xs text-gray-400">{doc.date}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Lưu
                      </Button>
                      <Button asChild>
                        <Link to={`/documents/${doc.id}`}>
                          <Download className="w-4 h-4 mr-2" />
                          Tải xuống
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <FileText className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy tài liệu</h3>
              <p className="text-gray-600 mb-6">
                Không tìm thấy tài liệu phù hợp với tiêu chí tìm kiếm của bạn.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSubject("Tất cả");
                  setSelectedGrade("Tất cả");
                  setSelectedType("Tất cả");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {sortedDocuments.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  &laquo; Trước
                </Button>
                <Button variant="outline" size="sm" className="bg-teal-50 text-teal-600">
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

export default Documents;

