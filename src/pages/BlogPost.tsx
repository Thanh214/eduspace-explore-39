
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
const blogPosts = [];

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
