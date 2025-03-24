
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Tests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  
  // Mock data
  const allTests = [
    {
      id: 1,
      title: "Bài kiểm tra giữa kỳ môn Toán",
      description: "Kiểm tra kiến thức cơ bản về hàm số và đạo hàm.",
      category: "Toán học",
      duration: "45 phút",
      totalQuestions: 20,
      difficulty: "Trung bình",
      date: "2023-11-05",
      status: "completed",
      score: 85,
    },
    {
      id: 2,
      title: "Bài kiểm tra cuối kỳ môn Lập trình Web",
      description: "Kiểm tra kiến thức về HTML, CSS, và JavaScript.",
      category: "Công nghệ thông tin",
      duration: "60 phút",
      totalQuestions: 30,
      difficulty: "Khó",
      date: "2023-12-10",
      status: "completed",
      score: 90,
    },
    {
      id: 3,
      title: "Bài kiểm tra nhanh HTML/CSS",
      description: "Đánh giá kỹ năng HTML và CSS cơ bản.",
      category: "Công nghệ thông tin",
      duration: "30 phút",
      totalQuestions: 15,
      difficulty: "Dễ",
      date: "2024-01-15",
      status: "available",
    },
    {
      id: 4,
      title: "Bài kiểm tra tiếng Anh IELTS",
      description: "Đánh giá trình độ tiếng Anh theo chuẩn IELTS.",
      category: "Ngoại ngữ",
      duration: "120 phút",
      totalQuestions: 40,
      difficulty: "Khó",
      date: "2024-02-20",
      status: "upcoming",
    },
  ];
  
  const filteredTests = filter === 'all' 
    ? allTests 
    : allTests.filter(test => test.status === filter);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Đã hoàn thành
          </div>
        );
      case 'available':
        return (
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Sẵn sàng
          </div>
        );
      case 'upcoming':
        return (
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Sắp tới
          </div>
        );
      default:
        return null;
    }
  };
  
  const getActionButton = (test: any) => {
    switch(test.status) {
      case 'completed':
        return (
          <Button variant="outline" onClick={() => navigate(`/tests/${test.id}/result`)}>
            Xem kết quả
          </Button>
        );
      case 'available':
        return (
          <Button onClick={() => navigate(`/tests/${test.id}`)}>
            Bắt đầu làm bài
          </Button>
        );
      case 'upcoming':
        return (
          <Button variant="outline" disabled>
            Chưa mở
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bài kiểm tra</h1>
              <p className="mt-2 text-gray-600">
                Kiểm tra kiến thức của bạn qua các bài kiểm tra
              </p>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả bài kiểm tra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bài kiểm tra</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                  <SelectItem value="available">Sẵn sàng</SelectItem>
                  <SelectItem value="upcoming">Sắp tới</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{test.title}</CardTitle>
                        <CardDescription className="mt-1">{test.description}</CardDescription>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Thể loại</p>
                        <p className="mt-1 font-medium">{test.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Thời gian</p>
                        <p className="mt-1 font-medium">{test.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Số câu hỏi</p>
                        <p className="mt-1 font-medium">{test.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Độ khó</p>
                        <p className="mt-1 font-medium">{test.difficulty}</p>
                      </div>
                    </div>
                    
                    {test.status === 'completed' && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-gray-500">Điểm số</p>
                          <p className="text-sm font-medium">{test.score}/100</p>
                        </div>
                        <Progress value={test.score} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Ngày thi: {new Date(test.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    {getActionButton(test)}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tests;
