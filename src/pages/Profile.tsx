
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

  // Empty arrays for user content
  const myCourses = [];
  const myDocuments = [];
  const myComments = [];

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
                        type="text"
                        value={tempProfileData.dob}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="DD/MM/YYYY"
                      />
                    ) : (
                      <div className="mt-1 font-medium">{user?.dob}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="courses" className="flex items-center">
                    <Book className="w-4 h-4 mr-2" />
                    <span>Khóa học của tôi</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Tài liệu đã mua</span>
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>Hoạt động của tôi</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Book className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa tham gia khóa học nào</h3>
                      <p className="text-gray-600 mb-4">Hãy khám phá các khóa học của chúng tôi để nâng cao kiến thức của bạn</p>
                      <Button asChild>
                        <Link to="/courses">Khám phá khóa học</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Bạn chưa mua tài liệu nào</h3>
                      <p className="text-gray-600 mb-4">Khám phá kho tài liệu đa dạng của chúng tôi để nâng cao kiến thức của bạn</p>
                      <Button asChild>
                        <Link to="/documents">Khám phá tài liệu</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="comments" className="space-y-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có hoạt động nào</h3>
                      <p className="text-gray-600 mb-4">Tham gia thảo luận và chia sẻ ý kiến của bạn về các khóa học và tài liệu</p>
                      <div className="flex gap-3 justify-center">
                        <Button asChild variant="outline">
                          <Link to="/blog">Đọc bài viết</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/blog/create">Đăng bài mới</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
