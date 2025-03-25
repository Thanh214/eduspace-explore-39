import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Search, Filter, Tag, Clock, Calendar, CreditCard, Wallet, Plus } from "lucide-react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserBalance from "@/components/UserBalance";

// Mocked documents data
const documentsData = [
  {
    id: 1,
    title: "Đề thi thử THPT Quốc Gia môn Toán năm 2023",
    description: "Bộ đề thi thử THPT Quốc Gia môn Toán với đáp án và hướng dẫn giải chi tiết",
    subject: "Toán",
    date: "2023-05-15",
    downloads: 1245,
    fileType: "PDF",
    fileSize: "2.4 MB",
    price: 20000,
    tags: ["đề thi", "THPT", "toán học"]
  },
  {
    id: 2,
    title: "Tài liệu ôn thi THPT Quốc Gia môn Tiếng Anh",
    description: "Tổng hợp ngữ pháp, từ vựng và các dạng bài tập thường gặp trong đề thi THPT Quốc Gia",
    subject: "Tiếng Anh",
    date: "2023-06-10",
    downloads: 987,
    fileType: "PDF",
    fileSize: "3.8 MB",
    price: 25000,
    tags: ["tài liệu", "THPT", "tiếng anh"]
  },
  {
    id: 3,
    title: "Bộ đề cương ôn tập môn Vật Lý lớp 12",
    description: "Đề cương ôn tập môn Vật Lý dành cho học sinh lớp 12 chuẩn bị cho kỳ thi THPT Quốc Gia",
    subject: "Vật Lý",
    date: "2023-04-22",
    downloads: 756,
    fileType: "PDF",
    fileSize: "1.9 MB",
    price: 15000,
    tags: ["đề cương", "vật lý", "lớp 12"]
  },
  {
    id: 4,
    title: "Bài giảng Hóa học chương Hidrocacbon",
    description: "Bài giảng chi tiết về chương Hidrocacbon trong chương trình Hóa học lớp 11",
    subject: "Hóa Học",
    date: "2023-03-18",
    downloads: 602,
    fileType: "PPTX",
    fileSize: "4.2 MB",
    price: 18000,
    tags: ["bài giảng", "hóa học", "lớp 11"]
  },
  {
    id: 5,
    title: "Tuyển tập bài tập Ngữ Văn lớp 10",
    description: "Tổng hợp các bài tập và đề kiểm tra Ngữ Văn dành cho học sinh lớp 10",
    subject: "Ngữ Văn",
    date: "2023-02-25",
    downloads: 489,
    fileType: "DOCX",
    fileSize: "1.6 MB",
    price: 12000,
    tags: ["bài tập", "ngữ văn", "lớp 10"]
  },
  {
    id: 6,
    title: "Giáo án Sinh học lớp 9 - Học kỳ 2",
    description: "Giáo án chi tiết môn Sinh học lớp 9 dành cho học kỳ 2 theo chương trình mới",
    subject: "Sinh Học",
    date: "2023-01-30",
    downloads: 375,
    fileType: "PDF",
    fileSize: "2.1 MB",
    price: 22000,
    tags: ["giáo án", "sinh học", "lớp 9"]
  }
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [documents, setDocuments] = useState(documentsData);
  const [selectedDocument, setSelectedDocument] = useState<typeof documentsData[0] | null>(null);
  const [userBalance, setUserBalance] = useState(50000); // User balance in VND

  // Filter documents based on search term and subject
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || doc.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    const parseDate = (dateStr: string): Date => new Date(dateStr);
    
    if (sortBy === "newest") {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime();
    } else if (sortBy === "oldest") {
      return parseDate(a.date).getTime() - parseDate(b.date).getTime();
    } else if (sortBy === "downloads") {
      return b.downloads - a.downloads;
    } else if (sortBy === "price_low") {
      return a.price - b.price;
    } else if (sortBy === "price_high") {
      return b.price - a.price;
    }
    return 0;
  });

  // Get unique subjects
  const subjects = Array.from(new Set(documents.map(doc => doc.subject)));

  // Handle downloading a document
  const handleDownload = (document: typeof documentsData[0]) => {
    if (userBalance >= document.price) {
      setUserBalance(prev => prev - document.price);
      toast({
        title: "Tải tài liệu thành công",
        description: `${document.title} đã được tải xuống.`,
      });
    } else {
      toast({
        title: "Số dư không đủ",
        description: "Vui lòng nạp thêm tiền để tải tài liệu này.",
        variant: "destructive"
      });
    }
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle adding credits
  const handleAddCredit = (amount: number) => {
    setUserBalance(prev => prev + amount);
    toast({
      title: "Nạp tiền thành công",
      description: `Bạn đã nạp thành công ${formatPrice(amount)}.`,
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">Tài liệu học tập</h1>
              <p className="mt-2 text-gray-600">
                Khám phá và tải về các tài liệu học tập chất lượng
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-2 text-gray-700">
                <Wallet className="w-5 h-5 mr-2 text-blue-500" />
                <span className="font-medium">Số dư hiện tại:</span>
                <span className="ml-2 font-bold text-blue-600">{formatPrice(userBalance)}</span>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Nạp tiền
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nạp tiền vào tài khoản</DialogTitle>
                    <DialogDescription>
                      Chọn số tiền bạn muốn nạp vào tài khoản
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {[50000, 100000, 200000, 500000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => handleAddCredit(amount)}
                        className="flex flex-col items-center h-auto py-3"
                      >
                        <span className="font-bold text-lg">{formatPrice(amount)}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-sm mb-2">Phương thức thanh toán</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border rounded-md p-2 text-center hover:border-blue-500 cursor-pointer">
                        <CreditCard className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Thẻ tín dụng</span>
                      </div>
                      <div className="border rounded-md p-2 text-center hover:border-blue-500 cursor-pointer">
                        <CreditCard className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Ngân hàng</span>
                      </div>
                      <div className="border rounded-md p-2 text-center hover:border-blue-500 cursor-pointer">
                        <Wallet className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Ví điện tử</span>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Hủy</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select
                  value={selectedSubject || "all"}
                  onValueChange={(value) => setSelectedSubject(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Môn học" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả môn học</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sắp xếp theo" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="downloads">Lượt tải nhiều nhất</SelectItem>
                    <SelectItem value="price_low">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price_high">Giá: Cao đến thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.map((document) => (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {document.subject}
                      </Badge>
                      <div className="font-medium text-blue-600">
                        {formatPrice(document.price)}
                      </div>
                    </div>
                    <CardTitle className="mt-2 line-clamp-2">{document.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{document.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(document.date).toLocaleDateString("vi-VN")}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        <span>{document.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>{document.fileType} • {document.fileSize}</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedDocument(document)}
                        >
                          Chi tiết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        {selectedDocument && (
                          <>
                            <DialogHeader>
                              <DialogTitle>{selectedDocument.title}</DialogTitle>
                              <DialogDescription>{selectedDocument.description}</DialogDescription>
                            </DialogHeader>
                            
                            <div className="mt-4 space-y-4">
                              <div className="flex justify-between">
                                <span className="font-medium">Môn học:</span>
                                <Badge variant="outline">{selectedDocument.subject}</Badge>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-medium">Ngày đăng:</span>
                                <span>{new Date(selectedDocument.date).toLocaleDateString("vi-VN")}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-medium">Lượt tải:</span>
                                <span>{selectedDocument.downloads}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-medium">Định dạng:</span>
                                <span>{selectedDocument.fileType} ({selectedDocument.fileSize})</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-medium">Giá:</span>
                                <span className="font-bold text-blue-600">{formatPrice(selectedDocument.price)}</span>
                              </div>
                              
                              <Separator />
                              
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">Số dư hiện tại:</span>
                                  <span className="ml-2 font-bold text-blue-600">{formatPrice(userBalance)}</span>
                                </div>
                                
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => handleDownload(selectedDocument)}
                                    disabled={userBalance < selectedDocument.price}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Tải xuống
                                  </Button>
                                </DialogClose>
                              </div>
                              
                              {userBalance < selectedDocument.price && (
                                <div className="text-sm text-red-500 text-center">
                                  Số dư không đủ. Vui lòng nạp thêm tiền để tải tài liệu này.
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {sortedDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tài liệu</h3>
              <p className="text-gray-600">
                Không có tài liệu nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Documents;
