import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, CalendarDays, Mail, Phone, MapPin, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AvatarUpload from '@/components/AvatarUpload';
import UserBalance from '@/components/UserBalance';

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Initialize form with user data when it's available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!updateUserProfile) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật hồ sơ. Vui lòng thử lại sau.",
        variant: "destructive",
      });
      return;
    }
    
    updateUserProfile({
      name,
      phone,
      address,
    });
    
    toast({
      title: "Thành công",
      description: "Thông tin hồ sơ đã được cập nhật.",
    });
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới không khớp với xác nhận mật khẩu.",
        variant: "destructive",
      });
      return;
    }
    
    // Call API to change password here
    
    toast({
      title: "Thành công",
      description: "Mật khẩu đã được thay đổi thành công.",
    });
    
    // Reset password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/3">
                <Card className="sticky top-24">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      <AvatarUpload 
                        fallback={user.name.substring(0, 2).toUpperCase()} 
                        currentAvatar={user.avatar}
                        onAvatarChange={(url) => updateUserProfile?.({ avatar: url })}
                      />
                    </div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <UserBalance />
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {user.address && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{user.address}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full flex items-center"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Main content */}
              <div className="md:w-2/3">
                <Tabs defaultValue="profile">
                  <TabsList className="mb-8">
                    <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
                    <TabsTrigger value="security">Bảo mật</TabsTrigger>
                    <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile">
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                        <CardDescription>
                          Cập nhật thông tin cá nhân của bạn.
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleProfileUpdate}>
                        <CardContent className="space-y-4">
                          <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-medium">
                              Họ và tên
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                readOnly
                                className="pl-10 bg-gray-50"
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              Email không thể thay đổi
                            </p>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="phone" className="text-sm font-medium">
                              Số điện thoại
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="address" className="text-sm font-medium">
                              Địa chỉ
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button type="submit">Lưu thay đổi</Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Đổi mật khẩu</CardTitle>
                        <CardDescription>
                          Cập nhật mật khẩu tài khoản của bạn.
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handlePasswordChange}>
                        <CardContent className="space-y-4">
                          <div className="space-y-1">
                            <label htmlFor="current-password" className="text-sm font-medium">
                              Mật khẩu hiện tại
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="new-password" className="text-sm font-medium">
                              Mật khẩu mới
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="confirm-password" className="text-sm font-medium">
                              Xác nhận mật khẩu mới
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button type="submit">Cập nhật mật khẩu</Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>

                  {/* Activity Tab */}
                  <TabsContent value="activity">
                    <Card>
                      <CardHeader>
                        <CardTitle>Hoạt động tài khoản</CardTitle>
                        <CardDescription>
                          Theo dõi lịch sử hoạt động của bạn trên hệ thống.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="absolute h-full w-px bg-gray-200 left-5 top-0"></div>
                          <ul className="space-y-4">
                            <li className="ml-10 relative pb-4">
                              <span className="absolute -left-6 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
                                <User className="w-3 h-3 text-blue-600" />
                              </span>
                              <div className="text-sm">
                                <p className="font-semibold">Đăng nhập thành công</p>
                                <p className="text-gray-500">Hôm nay, 15:30</p>
                              </div>
                            </li>
                            <li className="ml-10 relative pb-4">
                              <span className="absolute -left-6 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full ring-8 ring-white">
                                <Mail className="w-3 h-3 text-green-600" />
                              </span>
                              <div className="text-sm">
                                <p className="font-semibold">Xác thực email thành công</p>
                                <p className="text-gray-500">01/06/2023, 10:15</p>
                              </div>
                            </li>
                            <li className="ml-10 relative">
                              <span className="absolute -left-6 flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full ring-8 ring-white">
                                <User className="w-3 h-3 text-purple-600" />
                              </span>
                              <div className="text-sm">
                                <p className="font-semibold">Tạo tài khoản</p>
                                <p className="text-gray-500">01/06/2023, 10:10</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
