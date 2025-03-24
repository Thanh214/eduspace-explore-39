
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    toast({
      title: "Yêu cầu đăng nhập",
      description: "Vui lòng đăng nhập để tiếp tục sử dụng tính năng này.",
      variant: "destructive"
    });
    
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
