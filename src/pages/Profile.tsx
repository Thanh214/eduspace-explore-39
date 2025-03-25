
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Book, FileText, Clock, Calendar, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserBalance from "@/components/UserBalance";
import { useAuth } from "@/contexts/AuthContext";
import AvatarUpload from "@/components/AvatarUpload";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar || "/placeholder.svg");
  const [tempProfileData, setTempProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    dob: user?.dob || "",
  });
  const { toast } = useToast();

  // My Courses data
  const myCourses = [
    {
      id: 1,
      title: "Lập trình Web cơ bản với HTML, CSS và JavaScript",
      progress: 75,
      lastAccessed: "2023-10-15",
    },
    {
      id: 2,
      title: "Toán cao cấp cho sinh viên IT",
      progress: 40,
      lastAccessed: "2023-10-10",
    },
  ];

  // My Documents data
  const myDocuments = [
    {
      id: 1,
      title: "Đề thi thử THPT Quốc Gia môn Toán năm 2023",
      downloadDate: "2023-09-20",
      fileType: "PDF",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "Tài liệu ôn thi THPT Quốc Gia môn Tiếng Anh",
      downloadDate: "2023-09-15",
      fileType: "PDF",
      fileSize: "3.8 MB",
    },
  ];

  // My Tests data
  const myTests = [
    {
      id: 1,
      title: "Bài kiểm tra giữa kỳ môn Toán",
      date: "2023-11-05",
      score: "85/100",
      status: "Đã hoàn thành"
    },
    {
      id: 2,
      title: "Bài kiểm tra cuối kỳ môn Lập trình Web",
      date: "2023-12-10",
      score: "90/100",
      status: "Đã hoàn thành"
    },
    {
      id: 3,
      title: "Bài kiểm tra nhanh HTML/CSS",
      date: "2024-01-15",
      score: "-",
      status: "Chưa hoàn thành"
    }
  ];

  // My Comments data
  const myComments = [
    {
      id: 1,
      text: "Tài liệu rất hữu ích cho kỳ thi sắp tới, cảm ơn tác giả!",
      date: "2023-10-01",
      onPost: "Đề thi thử THPT Quốc Gia môn Toán năm 2023",
    },
    {
      id: 2,
      text: "Khóa học này rất chi tiết và dễ hiểu, đặc biệt phù hợp với người mới bắt đầu.",
      date: "2023-09-25",
      onPost: "Lập trình Web cơ bản với HTML, CSS và JavaScript",
    },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (user && updateUserProfile) {
        updateUserProfile({
          ...tempProfileData,
          avatar: avatarUrl
        });
      }
    } else {
      // Start editing
      setTempProfileData({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
        dob: user?.dob || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
    if (updateUserProfile) {
      updateUserProfile({ avatar: newAvatarUrl });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <AvatarUpload 
                  currentAvatar={avatarUrl}
                  fallback={user?.name?.substring(0, 2).toUpperCase() || "UN"}
                  onAvatarChange={handleAvatarChange}
                />
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{user?.phone}</span>
                    </div>
                  </div>
                </div>
                
                <UserBalance className="md:self-start" />
                
                <Button onClick={handleEditToggle} className="md:self-start">
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thông tin
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={tempProfileData.name}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{user?.name}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="mt-1 font-medium">{user?.email}</div>
                    {isEditing && (
                      <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi sau khi đăng ký</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={tempProfileData.phone}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{user?.phone}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={tempProfileData.address}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{user?.address}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày sinh</label>
                    {isEditing ? (
                      <Input
                        name="dob"
                        value={tempProfileData.dob}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{user?.dob}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="courses">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="courses">Khóa học của tôi</TabsTrigger>
                  <TabsTrigger value="documents">Tài liệu đã tải</TabsTrigger>
                  <TabsTrigger value="tests">Bài kiểm tra</TabsTrigger>
                  <TabsTrigger value="comments">Bình luận của tôi</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Khóa học của tôi</h2>
                  {myCourses.length > 0 ? (
                    <div className="space-y-4">
                      {myCourses.map((course) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <Link to={`/courses/${course.id}`} className="text-lg font-medium hover:text-blue-600 transition-colors">
                                    {course.title}
                                  </Link>
                                  <div className="mt-2 flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      <span>Tiến độ: {course.progress}%</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>Truy cập cuối: {formatDate(course.lastAccessed)}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button asChild>
                                  <Link to={`/courses/${course.id}`}>
                                    Tiếp tục học
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa đăng ký khóa học nào</h3>
                      <p className="text-gray-600 mb-4">
                        Hãy khám phá các khóa học chất lượng của chúng tôi
                      </p>
                      <Button asChild>
                        <Link to="/courses">Khám phá khóa học</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="documents" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Tài liệu đã tải</h2>
                  {myDocuments.length > 0 ? (
                    <div className="space-y-4">
                      {myDocuments.map((doc) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="text-lg font-medium">
                                    {doc.title}
                                  </div>
                                  <div className="mt-2 flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <FileText className="w-4 h-4 mr-1" />
                                      <span>{doc.fileType} • {doc.fileSize}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>Tải xuống: {formatDate(doc.downloadDate)}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="outline">
                                  Tải lại
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa tải tài liệu nào</h3>
                      <p className="text-gray-600 mb-4">
                        Khám phá kho tài liệu học tập phong phú của chúng tôi
                      </p>
                      <Button asChild>
                        <Link to="/documents">Khám phá tài liệu</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="tests" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Bài kiểm tra của tôi</h2>
                  {myTests.length > 0 ? (
                    <div className="space-y-4">
                      {myTests.map((test) => (
                        <motion.div
                          key={test.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="text-lg font-medium">
                                    {test.title}
                                  </div>
                                  <div className="mt-2 flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>Ngày thi: {formatDate(test.date)}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      <span>Điểm số: {test.score}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  test.status === "Đã hoàn thành" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {test.status}
                                </div>
                                <Button variant={test.status === "Đã hoàn thành" ? "outline" : "default"}>
                                  {test.status === "Đã hoàn thành" ? "Xem kết quả" : "Làm bài kiểm tra"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa có bài kiểm tra nào</h3>
                      <p className="text-gray-600 mb-4">
                        Hãy hoàn thành các bài học để mở khóa bài kiểm tra
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="comments" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Bình luận của tôi</h2>
                  {myComments.length > 0 ? (
                    <div className="space-y-4">
                      {myComments.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="mb-2 text-sm text-gray-500 flex items-center justify-between">
                                <span>Về: <span className="font-medium text-gray-700">{comment.onPost}</span></span>
                                <span>{formatDate(comment.date)}</span>
                              </div>
                              <Separator className="my-2" />
                              <p className="text-gray-800">{comment.text}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa có bình luận nào</h3>
                      <p className="text-gray-600 mb-4">
                        Hãy tham gia thảo luận trong các khóa học và tài liệu
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
