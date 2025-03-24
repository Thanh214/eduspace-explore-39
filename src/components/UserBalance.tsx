
import { useState } from "react";
import { Plus, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface UserBalanceProps {
  className?: string;
}

const UserBalance = ({ className = "" }: UserBalanceProps) => {
  const [userBalance, setUserBalance] = useState(50000); // Initial balance in VND

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
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 ${className}`}>
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
  );
};

export default UserBalance;
