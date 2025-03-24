
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, FileImage, Paperclip, Send, X 
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Categories for blog posts
const categories = [
  { id: "academic", name: "Học thuật" },
  { id: "skills", name: "Kỹ năng học tập" },
  { id: "exam", name: "Ôn thi đại học" },
  { id: "literature", name: "Văn học" },
  { id: "language", name: "Ngoại ngữ" },
  { id: "science", name: "Khoa học tự nhiên" }
];

// Tags for blog posts
const suggestedTags = [
  "học tập", "thpt", "đại học", "thi cử", "toán học", "văn học", 
  "tiếng anh", "vật lý", "hóa học", "sinh học", "kỹ năng"
];

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle adding a tag
  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };
  
  // Handle adding a suggested tag
  const handleAddSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      toast({
        title: "Tiêu đề trống",
        description: "Vui lòng nhập tiêu đề cho bài viết",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Nội dung trống",
        description: "Vui lòng nhập nội dung cho bài viết",
        variant: "destructive"
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Danh mục trống",
        description: "Vui lòng chọn danh mục cho bài viết",
        variant: "destructive"
      });
      return;
    }
    
    if (tags.length === 0) {
      toast({
        title: "Thẻ tag trống",
        description: "Vui lòng thêm ít nhất một thẻ tag cho bài viết",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the form data to the backend
    console.log({
      title,
      content,
      category,
      tags,
      image: previewImage
    });
    
    // Show success toast
    toast({
      title: "Đăng bài thành công",
      description: "Bài viết của bạn đã được đăng thành công"
    });
    
    // Redirect to blog page after posting
    navigate("/blog");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <motion.div 
          className="max-w-3xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/placeholder.svg" alt="Người dùng" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium text-gray-900">Tạo bài viết mới</h2>
                  <p className="text-sm text-gray-500">Chia sẻ kiến thức và kinh nghiệm của bạn</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Title input */}
                  <div>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      placeholder="Nhập tiêu đề bài viết..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  {/* Category select */}
                  <div>
                    <Label htmlFor="category">Danh mục</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Tags input */}
                  <div>
                    <Label htmlFor="tags">Thẻ tag</Label>
                    <div className="mt-1 flex">
                      <Input
                        id="tags"
                        placeholder="Nhập tag và nhấn Enter..."
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddTag}
                        className="ml-2"
                      >
                        Thêm
                      </Button>
                    </div>
                    
                    {/* Tags display */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <div 
                            key={index}
                            className="flex items-center bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Suggested tags */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Gợi ý:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags.filter(tag => !tags.includes(tag)).slice(0, 5).map((tag, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleAddSuggestedTag(tag)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content textarea */}
                  <div>
                    <Label htmlFor="content">Nội dung</Label>
                    <Textarea
                      id="content"
                      placeholder="Viết nội dung bài viết của bạn..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 min-h-[200px]"
                    />
                  </div>
                  
                  {/* Image upload */}
                  <div>
                    <Label>Hình ảnh</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                          >
                            <X className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <FileImage className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-1">Kéo thả hình ảnh vào đây hoặc click để chọn file</p>
                          <p className="text-xs text-gray-500">PNG, JPG (tối đa 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Attachments */}
                  <div>
                    <Label>Tài liệu đính kèm (tùy chọn)</Label>
                    <div className="mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center"
                        onClick={() => toast({
                          title: "Tính năng đang phát triển",
                          description: "Chức năng đính kèm tài liệu sẽ sớm được phát hành"
                        })}
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        Thêm tài liệu
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Submit button */}
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/blog")}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Đăng bài
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Preview */}
          {(title || content || previewImage) && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Xem trước bài viết
              </h2>
              <Card>
                <CardContent className="p-6">
                  {previewImage && (
                    <div className="mb-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {title && (
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  )}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {content && (
                    <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlogPost;
