
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để tiếp tục sử dụng tính năng này.",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, toast]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
