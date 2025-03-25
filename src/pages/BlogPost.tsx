import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, ChevronLeft, Heart, MessageSquare, 
  ThumbsUp, User 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Phương pháp học tập hiệu quả cho học sinh THPT",
    excerpt: "Khám phá các phương pháp học tập giúp nâng cao hiệu quả và kết quả học tập ở bậc THPT...",
    content: `<p>Học tập hiệu quả là mục tiêu của mọi học sinh, đặc biệt là các bạn học sinh THPT đang chuẩn bị cho kỳ thi quan trọng. Dưới đây là một số phương pháp học tập hiệu quả mà bạn có thể áp dụng:</p>
      <h2>1. Lập kế hoạch học tập</h2>
      <p>Việc lập kế hoạch học tập rõ ràng sẽ giúp bạn quản lý thời gian hiệu quả và đảm bảo không bỏ sót nội dung quan trọng. Bạn nên:</p>
      <ul>
        <li>Lập danh sách các môn học và ưu tiên theo độ khó</li>
        <li>Phân bổ thời gian hợp lý cho từng môn học</li>
        <li>Đặt mục tiêu cụ thể cho mỗi buổi học</li>
        <li>Dành thời gian cho việc ôn tập và củng cố kiến thức</li>
      </ul>
      <h2>2. Phương pháp Pomodoro</h2>
      <p>Phương pháp Pomodoro là kỹ thuật học tập và làm việc hiệu quả, giúp duy trì sự tập trung và tránh mệt mỏi. Cách thực hiện:</p>
      <ul>
        <li>Học tập tập trung trong 25 phút</li>
        <li>Nghỉ ngơi 5 phút</li>
        <li>Sau 4 chu kỳ, nghỉ dài hơn (15-30 phút)</li>
      </ul>
      <h2>3. Học tập chủ động</h2>
      <p>Học tập chủ động giúp bạn hiểu sâu và nhớ lâu hơn so với việc học thụ động. Một số cách học chủ động:</p>
      <ul>
        <li>Đặt câu hỏi và tìm câu trả lời</li>
        <li>Giải thích lại kiến thức bằng ngôn ngữ của bản thân</li>
        <li>Áp dụng kiến thức vào các bài tập và tình huống thực tế</li>
        <li>Dạy lại kiến thức cho người khác</li>
      </ul>
      <h2>4. Sử dụng sơ đồ tư duy</h2>
      <p>Sơ đồ tư duy giúp tổ chức và kết nối các ý tưởng, khái niệm một cách trực quan, từ đó dễ dàng hiểu và ghi nhớ kiến thức hơn.</p>
      <h2>5. Ngủ đủ giấc</h2>
      <p>Giấc ngủ đóng vai trò quan trọng trong việc củng cố trí nhớ và duy trì khả năng tập trung. Học sinh nên đảm bảo ngủ đủ 7-8 tiếng mỗi đêm.</p>`,
    author: {
      name: "Nguyễn Thanh Tùng",
      avatar: "/placeholder.svg",
      role: "Giáo viên THPT"
    },
    date: "12/05/2023",
    image: "/lovable-uploads/428998de-7ab2-4da3-a560-bc75a976d5af.png",
    tags: ["học tập", "thpt", "kỹ năng"],
    likes: 45,
    comments: [
      {
        id: 1,
        user: {
          name: "Lê Minh",
          avatar: "/placeholder.svg"
        },
        content: "Bài viết rất hay và bổ ích. Cảm ơn thầy đã chia sẻ!",
        date: "12/05/2023",
        likes: 5
      },
      {
        id: 2,
        user: {
          name: "Trần Hoa",
          avatar: "/placeholder.svg"
        },
        content: "Em đã áp dụng phương pháp Pomodoro và thấy hiệu quả rõ rệt. Khuyến khích mọi người thử phương pháp này.",
        date: "13/05/2023",
        likes: 3
      }
    ],
    category: "Kỹ năng học tập"
  },
  {
    id: 2,
    title: "10 bí quyết ôn thi đại học môn Toán hiệu quả",
    excerpt: "Những bí quyết giúp bạn ôn tập và chuẩn bị tốt nhất cho kỳ thi đại học môn Toán...",
    content: `<p>Môn Toán luôn là một trong những môn học quan trọng trong kỳ thi đại học. Dưới đây là 10 bí quyết giúp bạn ôn thi đại học môn Toán hiệu quả:</p>
      <h2>1. Nắm vững kiến thức cơ bản</h2>
      <p>Trước khi đi vào các bài tập nâng cao, bạn cần đảm bảo nắm vững các khái niệm, định lý và công thức cơ bản. Đây là nền tảng quan trọng để giải quyết các bài toán phức tạp.</p>
      <h2>2. Phân loại dạng bài tập</h2>
      <p>Phân loại các dạng bài tập thường gặp và tập trung vào những dạng bài chiếm tỷ trọng điểm cao trong đề thi. Điều này giúp bạn tiết kiệm thời gian và tăng hiệu quả ôn tập.</p>
      <h2>3. Luyện đề thường xuyên</h2>
      <p>Luyện đề là cách tốt nhất để làm quen với cấu trúc đề thi và tăng tốc độ làm bài. Bạn nên dành thời gian luyện đề đều đặn và chấm điểm nghiêm túc.</p>
      <h2>4. Tìm hiểu và áp dụng các phương pháp giải nhanh</h2>
      <p>Các phương pháp giải nhanh giúp bạn tiết kiệm thời gian trong phòng thi. Tuy nhiên, chỉ áp dụng khi bạn đã hiểu rõ bản chất của vấn đề.</p>
      <h2>5. Học nhóm hiệu quả</h2>
      <p>Học nhóm cùng bạn bè có thể giúp bạn hiểu sâu hơn về các vấn đề khó, chia sẻ kinh nghiệm và mở rộng cách nhìn về một bài toán.</p>
      <h2>6. Tham khảo nhiều nguồn tài liệu</h2>
      <p>Không nên chỉ dựa vào một cuốn sách hay một nguồn tài liệu. Tham khảo nhiều nguồn khác nhau sẽ giúp bạn có cái nhìn đa chiều và toàn diện hơn.</p>
      <h2>7. Quản lý thời gian ôn tập</h2>
      <p>Lập kế hoạch ôn tập chi tiết và tuân thủ nghiêm túc. Phân bổ thời gian hợp lý cho các phần khác nhau của môn Toán.</p>
      <h2>8. Nghỉ ngơi hợp lý</h2>
      <p>Đừng quên dành thời gian nghỉ ngơi hợp lý giữa các buổi học. Điều này giúp não bộ có thời gian tiếp thu và xử lý thông tin hiệu quả hơn.</p>
      <h2>9. Giữ tâm lý thoải mái</h2>
      <p>Áp lực thi cử có thể ảnh hưởng đến hiệu quả học tập. Hãy giữ tâm lý thoải mái và tự tin vào khả năng của bản thân.</p>
      <h2>10. Ôn tập có trọng tâm, trọng điểm</h2>
      <p>Không cần thiết phải học tất cả mọi thứ. Hãy tập trung vào những phần quan trọng, thường xuất hiện trong đề thi và phù hợp với khả năng của bản thân.</p>`,
    author: {
      name: "Trần Minh Hiếu",
      avatar: "/placeholder.svg",
      role: "Giáo viên Toán"
    },
    date: "05/06/2023",
    image: "/lovable-uploads/23067a8d-b301-4b0b-80d3-1735c26da8ce.png",
    tags: ["đại học", "thi cử", "toán học"],
    likes: 72,
    comments: [
      {
        id: 1,
        user: {
          name: "Phạm An",
          avatar: "/placeholder.svg"
        },
        content: "Cảm ơn thầy đã chia sẻ những bí quyết quý báu. Em sẽ áp dụng ngay!",
        date: "05/06/2023",
        likes: 8
      }
    ],
    category: "Ôn thi đại học"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState(() => {
    const foundPost = blogPosts.find(post => post.id.toString() === id);
    return foundPost || null;
  });
  
  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
            <Button asChild>
              <Link to="/blog">Quay lại trang blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      toast({
        title: "Bình luận trống",
        description: "Vui lòng nhập nội dung bình luận",
        variant: "destructive"
      });
      return;
    }
    
    const newComment = {
      id: post.comments.length + 1,
      user: {
        name: "Người dùng",
        avatar: "/placeholder.svg"
      },
      content: commentText,
      date: new Date().toLocaleDateString("vi-VN"),
      likes: 0
    };
    
    setPost(prevPost => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        comments: [...prevPost.comments, newComment]
      };
    });
    
    setCommentText("");
    
    toast({
      title: "Bình luận thành công",
      description: "Bình luận của bạn đã được đăng"
    });
  };
  
  const handleLikePost = () => {
    setIsLiked(!isLiked);
    setPost(prevPost => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1
      };
    });
  };
  
  const handleLikeComment = (commentId: number) => {
    setPost(prevPost => {
      if (!prevPost) return null;
      return {
        ...prevPost,
        comments: prevPost.comments.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: comment.likes + 1 } 
            : comment
        )
      };
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Quay lại danh sách bài viết
          </Link>
          
          <motion.article 
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[300px]">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post?.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                {post?.title}
              </h1>
              
              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post?.author.avatar} alt={post?.author.name} />
                  <AvatarFallback>{post?.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{post?.author.name}</div>
                  <div className="text-sm text-gray-500">{post?.author.role}</div>
                </div>
                <div className="ml-auto flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post?.date}</span>
                </div>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post?.content || "" }}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={isLiked ? "default" : "outline"}
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={handleLikePost}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post?.likes} Thích</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post?.comments.length} Bình luận</span>
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path 
                        d="M15 5l-1.5 1.5 3.5 3.5H7v2h10l-3.5 3.5L15 17l6-6-6-6z" 
                        fill="currentColor"
                        transform="rotate(45, 12, 12)"
                      />
                    </svg>
                    <span>Chia sẻ</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
          
          <div id="comments-section" className="mt-8">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-display font-semibold mb-6">
                Bình luận ({post?.comments.length})
              </h2>
              
              <div className="flex items-start mb-8">
                <Avatar className="h-10 w-10 mr-3 mt-1">
                  <AvatarImage src="/placeholder.svg" alt="Người dùng" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Viết bình luận của bạn..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mb-2 resize-none"
                  />
                  <Button onClick={handleCommentSubmit}>Đăng bình luận</Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                {post?.comments.map((comment) => (
                  <div key={comment.id} className="flex">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-medium text-gray-900 mb-1">{comment.user.name}</div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <button 
                          className="flex items-center hover:text-blue-600 transition-colors mr-4"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          <span>{comment.likes} Thích</span>
                        </button>
                        <button className="hover:text-blue-600 transition-colors mr-4">
                          Phản hồi
                        </button>
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
