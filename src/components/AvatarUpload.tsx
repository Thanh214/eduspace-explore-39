
import { useState, useRef, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps {
  currentAvatar?: string;
  fallback: string;
  onAvatarChange?: (avatarUrl: string) => void;
  className?: string;
}

const AvatarUpload = ({ 
  currentAvatar = "/placeholder.svg", 
  fallback, 
  onAvatarChange,
  className = "w-24 h-24"
}: AvatarUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string>(currentAvatar);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Loại file không hợp lệ",
        description: "Vui lòng chọn một file ảnh (jpg, png, gif, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: "Kích thước file tối đa là 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    setAvatarSrc(fileUrl);
    
    // Call the onAvatarChange callback if provided
    if (onAvatarChange) {
      onAvatarChange(fileUrl);
    }

    toast({
      title: "Cập nhật thành công",
      description: "Ảnh đại diện của bạn đã được cập nhật"
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <Avatar className={className}>
        <AvatarImage src={avatarSrc} alt="Avatar" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <Button 
        size="icon" 
        variant="outline" 
        className="absolute bottom-0 right-0 rounded-full bg-white"
        onClick={handleButtonClick}
      >
        <Camera className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default AvatarUpload;
