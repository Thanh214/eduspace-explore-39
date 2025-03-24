
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Add additional routes as we build other pages */}
          <Route path="/courses" element={<NotFound />} />
          <Route path="/courses/:id" element={<NotFound />} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/documents" element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/login" element={<NotFound />} />
          <Route path="/register" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
