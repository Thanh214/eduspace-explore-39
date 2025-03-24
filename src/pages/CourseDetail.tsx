
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Book, BookOpen, Check, ChevronDown, ChevronRight, 
  Clock, FileText, Lock, PlayCircle, Star, User, Video 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample course data - in a real app, this would come from an API
const coursesData = [
  {
    id: 1,
    title: "Toán học",
    description: "Khám phá toán học từ cơ bản đến nâng cao với phương pháp giải bài tập hiệu quả.",
    longDescription: "Khóa học Toán học là sự kết hợp hoàn hảo giữa lý thuyết cơ bản và các phương pháp giải bài tập hiệu quả, giúp học sinh từng bước nâng cao năng lực tư duy toán học. Chương trình được thiết kế bởi đội ngũ giáo viên giàu kinh nghiệm, tập trung vào việc xây dựng nền tảng kiến thức vững chắc và phát triển kỹ năng giải quyết vấn đề.",
    level: "Lớp 6-12",
    lessons: 42,
    duration: "36 giờ",
    rating: 4.9,
    image: "/lovable-uploads/428998de-7ab2-4da3-a560-bc75a976d5af.png",
    features: ["Video bài giảng", "Bài tập tương tác", "Kiểm tra đánh giá", "Hỗ trợ 24/7"],
    categories: ["toán học", "đại số", "hình học"],
    price: "Miễn phí",
    instructor: {
      name: "TS. Nguyễn Văn A",
      avatar: "/placeholder.svg",
      bio: "Tiến sĩ Toán học với hơn 15 năm kinh nghiệm giảng dạy tại các trường THPT và đại học hàng đầu.",
      subjects: ["Toán học", "Đại số", "Hình học"]
    },
    enrolledStudents: 1245,
    lastUpdated: "15/05/2023",
    chapters: [
      {
        id: "ch1",
        title: "Chương 1: Đại số cơ bản",
        description: "Nắm vững các khái niệm cơ bản về đại số",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Các phép toán cơ bản",
            duration: "45 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l2",
            title: "Bài 2: Biểu thức đại số",
            duration: "30 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l3",
            title: "Bài 3: Phương trình bậc nhất",
            duration: "50 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l4",
            title: "Kiểm tra chương 1",
            duration: "60 phút",
            type: "quiz",
            isLocked: false
          }
        ]
      },
      {
        id: "ch2",
        title: "Chương 2: Hình học phẳng",
        description: "Khám phá các khái niệm cơ bản về hình học phẳng",
        lessons: [
          {
            id: "l5",
            title: "Bài 1: Các khái niệm cơ bản",
            duration: "40 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l6",
            title: "Bài 2: Tam giác",
            duration: "45 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l7",
            title: "Bài 3: Tứ giác",
            duration: "40 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l8",
            title: "Bài 4: Đường tròn",
            duration: "50 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l9",
            title: "Kiểm tra chương 2",
            duration: "60 phút",
            type: "quiz",
            isLocked: true
          }
        ]
      },
      {
        id: "ch3",
        title: "Chương 3: Phương trình bậc hai",
        description: "Học cách giải các phương trình bậc hai",
        lessons: [
          {
            id: "l10",
            title: "Bài 1: Định nghĩa và dạng tổng quát",
            duration: "35 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l11",
            title: "Bài 2: Công thức nghiệm",
            duration: "50 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l12",
            title: "Bài 3: Định lý Viète",
            duration: "45 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l13",
            title: "Bài 4: Bài tập ứng dụng",
            duration: "55 phút",
            type: "document",
            isLocked: true
          },
          {
            id: "l14",
            title: "Kiểm tra chương 3",
            duration: "60 phút",
            type: "quiz",
            isLocked: true
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Tiếng Anh",
    description: "Nâng cao kỹ năng ngôn ngữ với các bài học phong phú và phương pháp học hiệu quả.",
    longDescription: "Khóa học Tiếng Anh được xây dựng để phát triển toàn diện bốn kỹ năng: Nghe, Nói, Đọc, Viết. Chương trình tập trung vào việc xây dựng nền tảng ngữ pháp vững chắc, từ vựng phong phú và kỹ năng giao tiếp tự tin trong mọi tình huống. Phương pháp học tương tác và thực hành thường xuyên giúp học sinh dễ dàng tiếp thu và áp dụng kiến thức vào thực tế.",
    level: "Lớp 6-12",
    lessons: 36,
    duration: "30 giờ",
    rating: 4.8,
    image: "/lovable-uploads/23067a8d-b301-4b0b-80d3-1735c26da8ce.png",
    features: ["Luyện nghe, nói, đọc, viết", "Ngữ pháp và từ vựng", "Bài kiểm tra", "Phát âm chuẩn"],
    categories: ["tiếng anh", "ngoại ngữ", "giao tiếp"],
    price: "Miễn phí",
    instructor: {
      name: "ThS. Trần Thị B",
      avatar: "/placeholder.svg",
      bio: "Thạc sĩ ngôn ngữ học ứng dụng với chứng chỉ IELTS 8.5 và hơn 10 năm kinh nghiệm giảng dạy tiếng Anh.",
      subjects: ["Tiếng Anh", "Ngữ pháp", "Kỹ năng giao tiếp"]
    },
    enrolledStudents: 982,
    lastUpdated: "20/06/2023",
    chapters: [
      {
        id: "ch1",
        title: "Chương 1: Cơ bản về ngữ pháp",
        description: "Nắm vững các cấu trúc ngữ pháp cơ bản",
        lessons: [
          {
            id: "l1",
            title: "Bài 1: Thì hiện tại đơn",
            duration: "40 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l2",
            title: "Bài 2: Thì hiện tại tiếp diễn",
            duration: "35 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l3",
            title: "Kiểm tra chương 1",
            duration: "45 phút",
            type: "quiz",
            isLocked: false
          }
        ]
      },
      {
        id: "ch2",
        title: "Chương 2: Từ vựng cơ bản",
        description: "Học các từ vựng thông dụng trong cuộc sống",
        lessons: [
          {
            id: "l4",
            title: "Bài 1: Chủ đề gia đình",
            duration: "30 phút",
            type: "video",
            isLocked: false
          },
          {
            id: "l5",
            title: "Bài 2: Chủ đề học đường",
            duration: "35 phút",
            type: "video",
            isLocked: true
          },
          {
            id: "l6",
            title: "Kiểm tra chương 2",
            duration: "40 phút",
            type: "quiz",
            isLocked: true
          }
        ]
      }
    ]
  }
];

// Sample lessons data
const lessonContent = {
  l1: {
    title: "Bài 1: Các phép toán cơ bản",
    content: `<h2 class="text-2xl font-bold mb-4">Các phép toán cơ bản</h2>
    <p class="mb-4">Trong bài học này, chúng ta sẽ tìm hiểu về các phép toán cơ bản trong toán học: cộng, trừ, nhân và chia. Đây là nền tảng quan trọng cho tất cả các chủ đề toán học nâng cao.</p>
    <h3 class="text-xl font-semibold mb-2">1. Phép cộng (+)</h3>
    <p class="mb-4">Phép cộng là phép toán cơ bản nhất, dùng để tìm tổng của hai hoặc nhiều số.</p>
    <div class="bg-blue-50 p-4 rounded-md mb-4">
      <p><strong>Ví dụ:</strong> 5 + 3 = 8</p>
    </div>
    <h3 class="text-xl font-semibold mb-2">2. Phép trừ (-)</h3>
    <p class="mb-4">Phép trừ dùng để tìm hiệu của hai số, hoặc để tìm số còn lại khi lấy số này trừ đi số kia.</p>
    <div class="bg-blue-50 p-4 rounded-md mb-4">
      <p><strong>Ví dụ:</strong> 9 - 4 = 5</p>
    </div>
    <h3 class="text-xl font-semibold mb-2">3. Phép nhân (×)</h3>
    <p class="mb-4">Phép nhân dùng để tìm tích của hai hoặc nhiều số. Có thể hiểu đơn giản là cộng một số với chính nó nhiều lần.</p>
    <div class="bg-blue-50 p-4 rounded-md mb-4">
      <p><strong>Ví dụ:</strong> 4 × 3 = 12 (tương đương với 4 + 4 + 4 = 12)</p>
    </div>
    <h3 class="text-xl font-semibold mb-2">4. Phép chia (÷)</h3>
    <p class="mb-4">Phép chia dùng để chia một số thành nhiều phần bằng nhau, hoặc để tìm xem một số chứa bao nhiêu lần số khác.</p>
    <div class="bg-blue-50 p-4 rounded-md mb-4">
      <p><strong>Ví dụ:</strong> 15 ÷ 3 = 5</p>
    </div>`,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    attachments: [
      { name: "Tài liệu bài giảng.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Bài tập thực hành.docx", size: "1.1 MB", type: "doc" }
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  // Find the course based on the ID from URL params
  const course = coursesData.find(c => c.id.toString() === id);
  
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Khóa học không tồn tại</h1>
            <Button asChild>
              <Link to="/courses">Quay lại danh sách khóa học</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Calculate total lessons
  const totalLessons = course.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  
  // Calculate total duration (in minutes)
  const totalDurationMinutes = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.reduce((lessonAcc, lesson) => {
      const minutes = parseInt(lesson.duration.split(' ')[0]);
      return lessonAcc + minutes;
    }, 0);
  }, 0);
  
  // Format total duration as hours and minutes
  const totalDurationHours = Math.floor(totalDurationMinutes / 60);
  const remainingMinutes = totalDurationMinutes % 60;
  const formattedDuration = `${totalDurationHours} giờ ${remainingMinutes > 0 ? `${remainingMinutes} phút` : ''}`;

  // Handler for enrolling in the course
  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Đăng ký thành công!",
      description: `Bạn đã đăng ký khóa học ${course.title} thành công.`,
    });
  };
  
  // Handler for when a lesson is clicked
  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (isLocked && !isEnrolled) {
      toast({
        title: "Bài học bị khóa",
        description: "Vui lòng đăng ký khóa học để mở khóa bài học này.",
        variant: "destructive"
      });
    } else {
      setSelectedLesson(lessonId);
      setActiveTab("content");
    }
  };

  // Handler for preview button
  const handlePreview = () => {
    // Set first unlocked lesson as selected
    const firstChapter = course.chapters[0];
    if (firstChapter && firstChapter.lessons.length > 0) {
      const firstLesson = firstChapter.lessons[0];
      setSelectedLesson(firstLesson.id);
      setActiveTab("content");
    }
    
    toast({
      title: "Xem trước khóa học",
      description: "Đang mở bài học đầu tiên để xem trước",
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <motion.h1 
                  className="text-3xl md:text-4xl font-display font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {course.title}
                </motion.h1>
                <motion.p 
                  className="mt-4 text-lg text-blue-100"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {course.description}
                </motion.p>
                
                <div className="mt-6 flex flex-wrap gap-4 items-center text-blue-100">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="#FACC15" />
                    <span>{course.rating} sao</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-1" />
                    <span>{course.enrolledStudents} học viên</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-1" />
                    <span>{totalLessons} bài học</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>{formattedDuration}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? "Đã đăng ký" : "Đăng ký ngay"} - {course.price}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white/10 hover:bg-white/20"
                    onClick={handlePreview}
                  >
                    Xem trước
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Khóa học này bao gồm:</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-fit">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="curriculum">Nội dung khóa học</TabsTrigger>
              <TabsTrigger value="content" disabled={!selectedLesson}>Bài học</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-display font-bold mb-4">Giới thiệu khóa học</h2>
                    <p className="text-gray-600">{course.longDescription}</p>
                    
                    <h3 className="text-xl font-display font-semibold mt-6 mb-3">Bạn sẽ học được gì?</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Nắm vững các khái niệm cơ bản và nâng cao</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Phương pháp giải bài tập hiệu quả</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Kỹ năng tư duy logic và sáng tạo</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Áp dụng kiến thức vào bài tập thực tế</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-display font-bold mb-4">Nội dung khóa học</h2>
                    <div className="space-y-4">
                      {course.chapters.map((chapter, index) => (
                        <div key={chapter.id} className="border border-gray-200 rounded-lg">
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                              <p className="text-sm text-gray-600">{chapter.lessons.length} bài học</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                    <h2 className="text-xl font-display font-bold mb-4">Giảng viên</h2>
                    <div className="flex items-center mb-4">
                      <img 
                        src={course.instructor.avatar} 
                        alt={course.instructor.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-sm text-gray-600">{course.instructor.subjects.join(", ")}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{course.instructor.bio}</p>
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">Thông tin thêm</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Cấp độ:</span>
                          <span className="font-medium">{course.level}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Bài học:</span>
                          <span className="font-medium">{totalLessons} bài</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Thời lượng:</span>
                          <span className="font-medium">{formattedDuration}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Cập nhật:</span>
                          <span className="font-medium">{course.lastUpdated}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-display font-bold mb-6">Nội dung khóa học</h2>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {course.chapters.map((chapter, index) => (
                    <AccordionItem 
                      key={chapter.id} 
                      value={chapter.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                          <p className="text-sm text-gray-600">{chapter.description} • {chapter.lessons.length} bài học</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0 pt-0 divide-y divide-gray-100">
                        {chapter.lessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            className={`px-6 py-4 flex items-center justify-between ${(!isEnrolled && lesson.isLocked) ? 'opacity-75' : 'cursor-pointer hover:bg-gray-50'}`}
                            onClick={() => handleLessonClick(lesson.id, lesson.isLocked)}
                          >
                            <div className="flex items-center space-x-3">
                              {lesson.type === 'video' && <Video className="w-5 h-5 text-blue-500" />}
                              {lesson.type === 'document' && <FileText className="w-5 h-5 text-orange-500" />}
                              {lesson.type === 'quiz' && <Book className="w-5 h-5 text-green-500" />}
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-600">{lesson.duration}</p>
                              </div>
                            </div>
                            {(!isEnrolled && lesson.isLocked) ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {!isEnrolled && (
                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">Đăng ký khóa học để mở khóa tất cả các bài học</p>
                    <Button size="lg" onClick={handleEnroll}>
                      Đăng ký ngay - {course.price}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="mt-6">
              {selectedLesson && lessonContent[selectedLesson as keyof typeof lessonContent] ? (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="border-b border-gray-200">
                    <div className="p-6">
                      <h2 className="text-2xl font-display font-bold">
                        {lessonContent[selectedLesson as keyof typeof lessonContent].title}
                      </h2>
                    </div>
                  </div>
                  
                  {lessonContent[selectedLesson as keyof typeof lessonContent].video && (
                    <div className="aspect-video">
                      <iframe 
                        className="w-full h-full"
                        src={lessonContent[selectedLesson as keyof typeof lessonContent].video}
                        title="Video bài giảng"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: lessonContent[selectedLesson as keyof typeof lessonContent].content 
                      }}
                    />
                    
                    {lessonContent[selectedLesson as keyof typeof lessonContent].attachments && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Tài liệu đính kèm</h3>
                        <div className="space-y-3">
                          {lessonContent[selectedLesson as keyof typeof lessonContent].attachments.map((attachment, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-blue-500 mr-3" />
                                <span>{attachment.name}</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline">{attachment.size}</Badge>
                                <Button variant="outline" size="sm">Tải xuống</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <Button variant="outline">
                        <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                        Bài trước
                      </Button>
                      <Button>
                        Bài tiếp theo
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <h2 className="text-xl font-medium mb-2">Chưa có bài học nào được chọn</h2>
                  <p className="text-gray-600 mb-4">Vui lòng chọn một bài học từ nội dung khóa học</p>
                  <Button onClick={() => setActiveTab("curriculum")}>
                    Xem nội dung khóa học
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
